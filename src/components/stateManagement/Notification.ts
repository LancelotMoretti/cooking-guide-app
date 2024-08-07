import { useState, useEffect } from 'react';
import { Notification } from '@/components/models/Notification';
import { FirebaseService } from '@/components/services/firebaseService';
import { db } from "@/firebaseConfig";
import { ref, update, remove, push, onValue, off } from "firebase/database";
import { NotificationItemProps } from "@/components/UI/notification/NotificationItem";

export const useNotifications = (userID: string) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
        const data = await FirebaseService.getNotifications(userID);
        setNotifications(data);
        };
        fetchNotifications();
    }, [userID]);

    return notifications;
};

interface NotificationData {
    id: string; // "0" for new notification
    recipeID: string;
    read: boolean;
    checkDelete: boolean;
    link: string;
}

export const readNotification = (userID: string): NotificationItemProps[] => {
    const [notifications, setNotifications] = useState<NotificationItemProps[]>([]);

    useEffect(() => {
        const notificationsRef = ref(db, `${userID}/notifications`);

        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const notificationsArray: NotificationItemProps[] = Object.keys(data).map(key => ({
                    notification: Notification.fromPlainObject({
                        notificationID: key,
                        recipeID: data[key].recipeID,
                        date: data[key].date,
                        content: data[key].content,
                        read: data[key].read,
                    }),
                    onReadChange: () => void {},
                    onDeleted: () => void {},
                }));
                setNotifications(notificationsArray);
            } else {
                setNotifications([]);
            }
        };

        onValue(notificationsRef, handleData);

        return () => {
            off(notificationsRef, 'value', handleData);
        };
    }, [userID]);

    return notifications;
};

export const writeNotification = (userID: string, props: NotificationData): void => {
    if (props.checkDelete) {
        remove(ref(db, `${userID}/notifications/${props.id}`));
        return;
    }

    if (props.id === '') {
        const newNotificationRef = push(ref(db, `${userID}/notifications`));
        props.id = newNotificationRef.key as string;
    }

    update(ref(db, `${userID}/notifications/${props.id}`), props);
};