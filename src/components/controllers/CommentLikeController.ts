import { db } from "@/firebaseConfig";
import { ref, update, get } from "firebase/database";

export class CommentLikeController {
    static async likeComment(userId: string, recipeId: string, commentId: string): Promise<void> {
        const commentRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}`);
        const snapshot = await get(commentRef);

        if (snapshot.exists()) {
            const commentData = snapshot.val();
            const currentLikes = commentData.likes || 0;
            await update(commentRef, { likes: currentLikes + 1 });
        }
    }

    static async unlikeComment(userId: string, recipeId: string, commentId: string): Promise<void> {
        const commentRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}`);
        const snapshot = await get(commentRef);

        if (snapshot.exists()) {
            const commentData = snapshot.val();
            const currentLikes = commentData.likes || 0;
            if (currentLikes > 0) {
                await update(commentRef, { likes: currentLikes - 1 });
            }
        }
    }

    static async getLikes(userId: string, recipeId: string, commentId: string): Promise<number> {
        const commentRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}`);
        const snapshot = await get(commentRef);
        return snapshot.exists() && snapshot.val().likes ? snapshot.val().likes : 0;
    }
}