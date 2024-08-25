import { db } from "@/firebaseConfig";
import { ref, set, get, update, remove, push, child } from "firebase/database";

export class RecipeController {
    static async createRecipe(userId: string, recipeData: any): Promise<string> {
        const newRecipeRef = push(ref(db, `users/${userId}/recipes`));
        await set(newRecipeRef, recipeData);
        return newRecipeRef.key || '';
    }

    static async getRecipe(userId: string, recipeId: string): Promise<any | null> {
        const recipeRef = ref(db, `users/${userId}/recipes/${recipeId}`);
        const snapshot = await get(recipeRef);
        return snapshot.exists() ? snapshot.val() : null;
    }

    static async updateRecipe(userId: string, recipeId: string, updatedData: any): Promise<void> {
        const recipeRef = ref(db, `users/${userId}/recipes/${recipeId}`);
        await update(recipeRef, updatedData);
    }

    static async deleteRecipe(userId: string, recipeId: string): Promise<void> {
        const recipeRef = ref(db, `users/${userId}/recipes/${recipeId}`);
        await remove(recipeRef);
    }

    static async getAllRecipes(userId: string): Promise<any[]> {
        const recipesRef = ref(db, `users/${userId}/recipes`);
        const snapshot = await get(recipesRef);
        return snapshot.exists() ? Object.values(snapshot.val()) : [];
    }
}