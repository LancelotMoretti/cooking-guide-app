import { db } from "@/firebaseConfig";
import { ref, set, get, update, remove, push } from "firebase/database";

export class CommentController {
    static async addComment(userId: string, recipeId: string, commentData: any): Promise<string> {
        const newCommentRef = push(ref(db, `users/${userId}/recipes/${recipeId}/comments`));
        await set(newCommentRef, commentData);
        return newCommentRef.key || '';
    }

    static async getComment(userId: string, recipeId: string, commentId: string): Promise<any | null> {
        const commentRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}`);
        const snapshot = await get(commentRef);
        return snapshot.exists() ? snapshot.val() : null;
    }

    static async updateComment(userId: string, recipeId: string, commentId: string, updatedData: any): Promise<void> {
        const commentRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}`);
        await update(commentRef, updatedData);
    }

    static async deleteComment(userId: string, recipeId: string, commentId: string): Promise<void> {
        const commentRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}`);
        await remove(commentRef);
    }

    static async getAllComments(userId: string, recipeId: string): Promise<any[]> {
        const commentsRef = ref(db, `users/${userId}/recipes/${recipeId}/comments`);
        const snapshot = await get(commentsRef);
        return snapshot.exists() ? Object.values(snapshot.val()) : [];
    }
}