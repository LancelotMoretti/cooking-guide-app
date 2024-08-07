import { db } from "@/firebaseConfig";
import { ref, set, push, update, onValue, off, remove } from "firebase/database";
import { Recipe } from "@/components/models/Recipe";
import { getRecipe, getRecipes } from "@/components/services/recipeService";

export interface CategoryInforInterface {
    id: string;
    name: string;
    image: string;
    description: string;
}

export interface CategoryInterface {
    information: CategoryInforInterface;
    recipes: string[];
}

export const createCategory = (
    name: string,
    image: string,
    description: string
): string => {
    const newCategoryRef = push(ref(db, 'categories'));
    const categoryId = newCategoryRef.key as string;
    set(newCategoryRef, {
        id: categoryId,
        name,
        image,
        description,
        recipes: {}
    });

    return categoryId;
}

export const getCategories = async (): Promise<CategoryInforInterface[]> => {
    const categoriesRef = ref(db, 'categories');
    const categories: CategoryInforInterface[] = [];

    await new Promise<void>((resolve, reject) => {
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((categoryId) => {
                    const categoryData = data[categoryId];
                    const category: CategoryInforInterface = {
                        id: categoryId,
                        name: categoryData.name,
                        image: categoryData.image,
                        description: categoryData.description,
                    };
                    categories.push(category);
                });
                resolve();
            } else {
                reject(new Error('No categories found'));
            }
        });
    });

    off(categoriesRef, 'value');

    return categories;
}

export const getCategory = async (id: string): Promise<CategoryInterface> => {
    const categoryRef = ref(db, `categories/${id}`);
    const category: CategoryInterface = {
        information: {} as CategoryInforInterface,
        recipes: []
    };

    await new Promise<void>((resolve, reject) => {
        onValue(categoryRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                category.information = {
                    id,
                    name: data.name,
                    image: data.image,
                    description: data.description
                };
                category.recipes = Object.keys(data.recipes);
                resolve();
            } else {
                reject(new Error('Category not found'));
            }
        });
    });

    off(categoryRef, 'value');

    return category;
}

export const updateCategory = (
    id: string,
    name: string,
    image: string,
    description: string
): void => {
    const categoryRef = ref(db, `categories/${id}`);
    update(categoryRef, {
        name,
        image,
        description
    });
}

export const removeCategory = (id: string): void => {
    const categoryRef = ref(db, `categories/${id}`);
    remove(categoryRef);
}

export const addRecipeToCategory = (categoryId: string, recipeID: string): void => {
    const categoryRef = ref(db, `categories/${categoryId}/recipes`);
    update(categoryRef, {
        [recipeID]: true
    });
}

export const autoAddRecipeToCategory = async (recipe: Recipe): Promise<void> => {
    const categories = await getCategories();
    for (const category of categories) {
        if (category.name.toLowerCase().includes(recipe.title.toLowerCase())) {
            addRecipeToCategory(category.id, recipe.recipeID);
        }
    }
}

export const removeRecipeFromCategory = (categoryId: string, recipeID: string): void => {
    const categoryRef = ref(db, `categories/${categoryId}/recipes/${recipeID}`);
    remove(categoryRef);
}

export const searchCategories = async (query: string): Promise<CategoryInforInterface[]> => {
    const categoriesRef = ref(db, 'categories');
    const categories: CategoryInforInterface[] = [];

    await new Promise<void>((resolve, reject) => {
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((categoryId) => {
                    const categoryData = data[categoryId];
                    if (categoryData.name.toLowerCase().includes(query.toLowerCase()) || 
                        categoryData.description.toLowerCase().includes(query.toLowerCase())) {
                        const category: CategoryInforInterface = {
                            id: categoryId,
                            name: categoryData.name,
                            image: categoryData.image,
                            description: categoryData.description,
                        };
                        categories.push(category);
                    }
                });
                resolve();
            } else {
                reject(new Error('No categories found'));
            }
        });
    });

    off(categoriesRef, 'value');

    return categories;
}

export const getRecipesInCategory = async (categoryId: string): Promise<Recipe[]> => {
    const category = await getCategory(categoryId);
    const recipes: Recipe[] = [];

    for (let recipeID = 0; recipeID < category.recipes.length; recipeID++) {
        const recipe = getRecipe(category.recipes[recipeID]);
        if (recipe) {
            recipes.push(await recipe);
        }
    }

    return recipes;
}