import { db } from "@/firebaseConfig";
import { ref, update, remove, get, onValue } from "firebase/database";

export function checkFavorite(userId: string, recipeId: string, callback: (isFavorite: boolean) => void): void {
    const favoriteRef = ref(db, `users/${userId}/favorites/${recipeId}/isFavorite`);
    
    onValue(favoriteRef, (snapshot) => {
        const favoriteData = snapshot.val();
        callback(favoriteData === true);
    }, {
        onlyOnce: true
    });
}
export class RecipeFavoriteController {
    static async toggleFavorite(userId: string, recipeId: string): Promise<void> {
        const favoriteRef = ref(db, `users/${userId}/favorites/${recipeId}`);
        const snapshot = await get(favoriteRef);
        if (snapshot.exists()) {
            await remove(favoriteRef);
        } else {
            await update(favoriteRef, { isFavorite: true });
        }
    }

    static async getFavorites(userID: string): Promise<string[]> {
        const favoritesRef = ref(db, `users/${userID}/favorites`);
        const snapshot = await get(favoritesRef);
        return snapshot.exists() ? Object.keys(snapshot.val()) : [];
    }
}