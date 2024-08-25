import * as SecureStore from 'expo-secure-store';

export class SecureStorageService {
    static async save(key: string, value: string): Promise<void> {
        await SecureStore.setItemAsync(key, value);
    }

    static async get(key: string): Promise<string | null> {
        return await SecureStore.getItemAsync(key);
    }

    static async delete(key: string): Promise<void> {
        await SecureStore.deleteItemAsync(key);
    }
}