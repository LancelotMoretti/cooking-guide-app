import { db } from "@/firebaseConfig";
import { ref, update, get, child } from "firebase/database";

export class RecipeRatingController {
    static async rateRecipe(userId: string, recipeId: string, rating: number): Promise<void> {
        const recipeRef = ref(db, `users/${userId}/recipes/${recipeId}`);
        const snapshot = await get(recipeRef);

        if (snapshot.exists()) {
            const recipeData = snapshot.val();
            const updatedRating = recipeData.rating ? (recipeData.rating + rating) / 2 : rating;
            await update(recipeRef, { rating: updatedRating });
        }
    }

    static async getRating(userId: string, recipeId: string): Promise<number> {
        const recipeRef = ref(db, `users/${userId}/recipes/${recipeId}`);
        const snapshot = await get(recipeRef);
        return snapshot.exists() && snapshot.val().rating ? snapshot.val().rating : 0;
    }
}