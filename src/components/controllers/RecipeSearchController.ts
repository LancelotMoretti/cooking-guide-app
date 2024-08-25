import { db } from "@/firebaseConfig";
import { ref, get, query, orderByChild, equalTo, startAt, endAt } from "firebase/database";

export class RecipeSearchController {
    static async searchRecipes(userId: string, searchTerm: string): Promise<any[]> {
        const recipesRef = ref(db, `users/${userId}/recipes`);
        const searchQuery = query(recipesRef, orderByChild("name"), startAt(searchTerm), endAt(searchTerm + "\uf8ff"));
        const snapshot = await get(searchQuery);
        return snapshot.exists() ? Object.values(snapshot.val()) : [];
    }

    static async filterRecipesByCategory(userId: string, category: string): Promise<any[]> {
        const recipesRef = ref(db, `users/${userId}/recipes`);
        const categoryQuery = query(recipesRef, orderByChild("category"), equalTo(category));
        const snapshot = await get(categoryQuery);
        return snapshot.exists() ? Object.values(snapshot.val()) : [];
    }
}