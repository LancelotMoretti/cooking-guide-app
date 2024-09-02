import { off, set, ref, onValue, update, remove, push } from "firebase/database";
import { db } from "@/firebaseConfig";
import { Recipe } from "@/components/models/Recipe";

export const getRecipes = async (): Promise<Recipe[]> => {
    const recipesRef = ref(db, 'recipes');
    const recipes: Recipe[] = [];

    await new Promise<void>((resolve, reject) => {
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((recipeID) => {
                    const recipeData = data[recipeID];
                    recipes.push(Recipe.fromPlainObject(recipeData));
                });
                resolve();
            } else {
                reject(new Error('No recipes found'));
            }
        });
    });

    off(recipesRef, 'value');

    return recipes;
}

export const getRecipe = async (recipeID: string): Promise<Recipe> => {
    const recipeRef = ref(db, `recipes/${recipeID}`);
    let recipe: Recipe | null = null;

    await new Promise<void>((resolve, reject) => {
        onValue(recipeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                recipe = Recipe.fromPlainObject(data);
                resolve();
            } else {
                reject(new Error('Recipe not found'));
            }
        });
    });

    off(recipeRef, 'value');

    return recipe as unknown as Recipe;
}

export const createRecipe = (recipe: Recipe): void => {
    const newRecipeRef = push(ref(db, 'recipes'));
    set(newRecipeRef, {
        recipeID: newRecipeRef.key,
        ...recipe.toPlainObject()
    });
}

export const updateRecipe = (recipeID: string, updatedRecipe: Recipe): void => {
    const recipeRef = ref(db, `recipes/${recipeID}`);
    update(recipeRef, updatedRecipe.toPlainObject());
}

export const deleteRecipe = (recipeID: string): void => {
    const recipeRef = ref(db, `recipes/${recipeID}`);
    remove(recipeRef);
}

export const setStatusRecipe = (recipeID: string, status: string): void => {
    const recipeRef = ref(db, `recipes/${recipeID}`);
    update(recipeRef, {
        status
    });
}

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
    const recipesRef = ref(db, 'recipes');
    const recipes: Recipe[] = [];

    await new Promise<void>((resolve, reject) => {
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((recipeID) => {
                    const recipeData = data[recipeID];
                    if (recipeData.title.toLowerCase().includes(query.toLowerCase()) ||
                        recipeData.description.toLowerCase().includes(query.toLowerCase())) {
                        recipes.push(Recipe.fromPlainObject(recipeData));
                    }
                });
                resolve();
            } else {
                reject(new Error('No recipes found'));
            }
        });
    });

    off(recipesRef, 'value');

    return recipes;
}