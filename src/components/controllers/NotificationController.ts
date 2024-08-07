import { Notification } from '@/components/models/Notification';
import { FirebaseService } from '@/components/services/firebaseService';

export class NotificationController {
    static async getNotifications(userID: string): Promise<Notification[]> {
        return await FirebaseService.getNotifications(userID);
    }

    static async markAsRead(notificationID: string): Promise<void> {
        await FirebaseService.updateNotification(notificationID, { read: true });
    }

    static async deleteNotification(notificationID: string): Promise<void> {
        await FirebaseService.deleteNotification(notificationID);
    }
}