import { db } from "@/firebaseConfig";
import { ref, onValue, off, set, push, remove } from "firebase/database";
import { Recipe } from "./recipeServices";

export interface SearchSuggestion {
    id: string;
    query: string;
}

const RECENT_SEARCHES_LIMIT = 10;

export const getRecentSearches = async (userID: string): Promise<SearchSuggestion[]> => {
    const searchesRef = ref(db, `users/${userID}/recentSearches`);
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

export const saveSearchQuery = async (userID: string, query: string): Promise<void> => {
    const newSearchRef = push(ref(db, `users/${userID}/recentSearches`));

    await set(newSearchRef, {
        query,
    });

    const recentSearches = await getRecentSearches(userID);
    if (recentSearches.length > RECENT_SEARCHES_LIMIT) {
        const oldestSearch = recentSearches[0];
        const oldestSearchRef = ref(db, `users/${userID}/recentSearches/${oldestSearch.id}`);
        await remove(oldestSearchRef);
    }
}

export const searchRecipes = async (query: string): Promise<string[]> => {
    const recipesRef = ref(db, 'recipes');
    const recipes: string[] = [];

    await new Promise<void>((resolve) => {
        onValue(recipesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.keys(data).forEach((recipeId) => {
                    const recipeData: Recipe = data[recipeId];
                    if (recipeData.description.toLowerCase().includes(query.toLowerCase()) || 
                        recipeData.instructions.join(' ').toLowerCase().includes(query.toLowerCase()) ||
                        recipeData.ingredients.some(ingredient => ingredient.description.toLowerCase().includes(query.toLowerCase()))){
                        recipes.push(recipeId);
                    }
                });
            }
            resolve();
        });
    });

    off(recipesRef, 'value');
    return recipes;
}