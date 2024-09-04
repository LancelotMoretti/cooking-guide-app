import { db } from "@/firebaseConfig";
import { useState, useEffect } from "react";
import { ref, update, remove, get, onValue } from "firebase/database";

export function useIsFavorite(userId: string, recipeId: string): boolean {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (userId && recipeId) {
            const favoriteRef = ref(db, `users/${userId}/favorites/${recipeId}/isFavorite`);

            const unsubscribe = onValue(favoriteRef, (snapshot) => {
                const isFav = snapshot.exists() && snapshot.val() === true;
                setIsFavorite(isFav);
            });

            return () => unsubscribe();
        }
    }, [userId, recipeId]);

    return isFavorite;
}

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