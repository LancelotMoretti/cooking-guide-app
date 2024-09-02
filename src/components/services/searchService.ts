import { db } from "@/firebaseConfig";
import { ref, onValue, off, set, push, remove } from "firebase/database";

export interface SearchSuggestion {
    id: string;
    query: string;
}

const RECENT_SEARCHES_LIMIT = 7;

export const getRecentSearches = async (userID: string): Promise<SearchSuggestion[]> => {
    const searchesRef = ref(db, `${userID}/recentSearches`);
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
    return recentSearches.reverse();
}

export const saveSearchQuery = async (userID: string, query: string): Promise<void> => {
    const recentSearches = await getRecentSearches(userID);
    if (recentSearches.some(search => search.query === query)) {
        return;
    }
    const newSearchRef = push(ref(db, `${userID}/recentSearches`));
    await set(newSearchRef, {
        query,
    });
    if (recentSearches.length > RECENT_SEARCHES_LIMIT) {
        const oldestSearch = recentSearches[recentSearches.length - 1];
        const oldestSearchRef = ref(db, `${userID}/recentSearches/${oldestSearch.id}`);
        await remove(oldestSearchRef);
    }
}