import { db } from "@/firebaseConfig";
import { User } from '@/components/models/User';
import { Notification } from '@/components/models/Notification';
import { ref, get } from 'firebase/database';

export class FirebaseService {
    static async getUser(userID: string): Promise<User> {
        // Firebase logic to get user
        return new User(userID, 'username', 'email', 'password', 'User', false, 'Free', [], [], [], [], [])
    }

    static async getUsername(userID: string): Promise<string> {
        const userRef = ref(db, `users/${userID}/fullName`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            return data
        } else {
            throw new Error("User not found");
        }
    }

    static async updateUser(userID: string, data: Partial<User>): Promise<void> {
        // Firebase logic to update user
    }

    static async deleteUser(userID: string): Promise<void> {
        // Firebase logic to delete user
    }

    static async getNotifications(userID: string): Promise<Notification[]> {
        // Firebase logic to get notifications
        return [
            new Notification('notificationID', 'recipeID', 'date', 'content', false),
            new Notification('notificationID', 'recipeID', 'date', 'content', false),
            new Notification('notificationID', 'recipeID', 'date', 'content', false),
            new Notification('notificationID', 'recipeID', 'date', 'content', false),
            new Notification('notificationID', 'recipeID', 'date', 'content', false)
        ];
    }

    static async updateNotification(notificationID: string, data: Partial<Notification>): Promise<void> {
        // Firebase logic to update notification
    }

    static async deleteNotification(notificationID: string): Promise<void> {
        // Firebase logic to delete notification
    }
}