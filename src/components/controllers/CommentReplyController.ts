import { db } from "@/firebaseConfig";
import { ref, set, get, push, remove } from "firebase/database";

export class CommentReplyController {
    static async addReply(userId: string, recipeId: string, commentId: string, replyData: any): Promise<string> {
        const newReplyRef = push(ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}/replies`));
        await set(newReplyRef, replyData);
        return newReplyRef.key || '';
    }

    static async getReply(userId: string, recipeId: string, commentId: string, replyId: string): Promise<any | null> {
        const replyRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}/replies/${replyId}`);
        const snapshot = await get(replyRef);
        return snapshot.exists() ? snapshot.val() : null;
    }

    static async deleteReply(userId: string, recipeId: string, commentId: string, replyId: string): Promise<void> {
        const replyRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}/replies/${replyId}`);
        await remove(replyRef);
    }

    static async getAllReplies(userId: string, recipeId: string, commentId: string): Promise<any[]> {
        const repliesRef = ref(db, `users/${userId}/recipes/${recipeId}/comments/${commentId}/replies`);
        const snapshot = await get(repliesRef);
        return snapshot.exists() ? Object.values(snapshot.val()) : [];
    }
}