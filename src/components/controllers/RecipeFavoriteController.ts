import { db } from "@/firebaseConfig";
import { ref, update, get } from "firebase/database";

export class RecipeFavoriteController {
    static async toggleFavorite(userId: string, recipeId: string): Promise<void> {
        const recipeRef = ref(db, `users/${userId}/recipes/${recipeId}`);
        const snapshot = await get(recipeRef);

        if (snapshot.exists()) {
            const recipeData = snapshot.val();
            const isFavorite = recipeData.isFavorite || false;
            await update(recipeRef, { isFavorite: !isFavorite });
        }
    }

    static async getFavorites(userId: string): Promise<any[]> {
        const recipesRef = ref(db, `users/${userId}/recipes`);
        const snapshot = await get(recipesRef);
        if (snapshot.exists()) {
            const recipes = snapshot.val();
            return Object.values(recipes).filter((recipe: any) => recipe.isFavorite);
        }
        return [];
    }
}