import { off, set, ref, onValue, update, remove, push } from "firebase/database";
import { auth, db } from "@/firebaseConfig";
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
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not logged in');
    }
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

    // Chuẩn hóa và tách query thành các từ khóa
    const normalizeText = (text: string) =>
        text
            .normalize('NFD') // Chuẩn hóa các ký tự Unicode
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu (nếu có)
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Loại bỏ dấu câu
            .toLowerCase()
            .trim(); // Xóa khoảng trắng đầu và cuối

    const queryWords = normalizeText(query)
        .split(/\s+/) // Tách thành mảng các từ khóa
        .filter(Boolean); // Loại bỏ các phần tử rỗng
    if (queryWords.length === 0 || queryWords[0] === '' || queryWords[0] === ' ') {
        return recipes;
    }      

    await new Promise<void>((resolve, reject) => {
        if (query.toLowerCase() === 'random') {
            onValue(recipesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const allRecipes = Object.keys(data).map((recipeID) =>
                        Recipe.fromPlainObject(data[recipeID])
                    );
                    // Chọn ngẫu nhiên 5 công thức
                    while (recipes.length < 5 && allRecipes.length > 0) {
                        const randomIndex = Math.floor(Math.random() * allRecipes.length);
                        recipes.push(allRecipes.splice(randomIndex, 1)[0]);
                    }
                    resolve();
                } else {
                    reject(new Error('No recipes found'));
                }
            });
        }

        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((recipeID) => {
                    const recipeData:Recipe = data[recipeID];
                    const recipeTitle = normalizeText(recipeData.title || '');
                    const recipeDescription = normalizeText(recipeData.description || '');
                    let recipeMealType = '';
                    if (recipeData.meal?.breakfast) {
                        recipeMealType = 'breakfast';
                    }           
                    else if (recipeData.meal?.lunch) {
                        recipeMealType = 'lunch';
                    }
                    else if (recipeData.meal?.dinner) {
                        recipeMealType = 'dinner';
                    }
                    
                    const time = recipeData.duration?.hour * 60 + recipeData.duration?.minute || 0;
                    const isQuick = time <= 30;
                    const isMedium = time > 30 && time <= 60;
                    const isLong = time > 60;

                    // Tạo một chuỗi chứa cả tiêu đề và mô tả
                    const combinedText = `${recipeTitle} ${recipeDescription}`;
                    
                    // Kiểm tra nếu tất cả các từ khóa đều xuất hiện trong combinedText
                    const isMatch = queryWords.every(word => 
                        combinedText.includes(word) ||
                        recipeData.tags?.some(tag => normalizeText(tag).includes(word)) ||
                        (isQuick && word === 'quick') ||
                        (isMedium && word === 'medium') ||
                        (isLong && word === 'long')
                    );
                    
                    if (isMatch) {
                        recipes.push(Recipe.fromPlainObject(recipeData));
                    }

                    for (let i = 0; i < queryWords.length; i++) {
                        if (recipeMealType === queryWords[i]) {
                            recipes.push(Recipe.fromPlainObject(recipeData));
                            break;
                        }
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
};
