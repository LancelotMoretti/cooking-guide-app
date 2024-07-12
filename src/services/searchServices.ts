import { db } from "@/firebaseConfig";
import { ref, onValue, off, set, push, remove } from "firebase/database";
import { Recipe } from "./recipeServices";

export interface SearchSuggestion {
    id: string;
    query: string;
}

const RECENT_SEARCHES_LIMIT = 10;

export const getRecentSearches = async (userId: string): Promise<SearchSuggestion[]> => {
    const searchesRef = ref(db, `users/${userId}/recentSearches`);
    const recentSearches: SearchSuggestion[] = [];

    await new Promise<void>((resolve) => {
        onValue(searchesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((searchId) => {
                    const search: SearchSuggestion = {
                        id: searchId,
                        query: data[searchId].query,
                    };
                    recentSearches.push(search);
                });
            }
            resolve();
        });
    });

    off(searchesRef, 'value');
    return recentSearches;
}

export const saveSearchQuery = async (userId: string, query: string): Promise<void> => {
    const newSearchRef = push(ref(db, `users/${userId}/recentSearches`));

    await set(newSearchRef, {
        query,
    });

    const recentSearches = await getRecentSearches(userId);
    if (recentSearches.length > RECENT_SEARCHES_LIMIT) {
        const oldestSearch = recentSearches[0];
        const oldestSearchRef = ref(db, `users/${userId}/recentSearches/${oldestSearch.id}`);
        await remove(oldestSearchRef);
    }
}

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
    const recipesRef = ref(db, 'recipes');
    const recipes: Recipe[] = [];

    await new Promise<void>((resolve) => {
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((recipeId) => {
                    const recipeData: Recipe = data[recipeId];
                    if (recipeData.description.toLowerCase().includes(query.toLowerCase()) || 
                        recipeData.instructions.join(' ').toLowerCase().includes(query.toLowerCase()) ||
                        recipeData.ingredients.some(ingredient => ingredient.description.toLowerCase().includes(query.toLowerCase()))){
                        const recipe: Recipe = {
                            // id: recipeId,
                            description: recipeData.description,
                            timeRecipe: recipeData.timeRecipe,
                            ingredients: recipeData.ingredients,
                            instructions: recipeData.instructions,
                        };
                        recipes.push(recipe);
                    }
                });
            }
            resolve();
        });
    });

    off(recipesRef, 'value');
    return recipes;
}