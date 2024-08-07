import { db } from "@/firebaseConfig";
import { set, ref, update, remove, push, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { NotificationItemProps } from "@/components/UI/notification/NotificationItem";
import { Notification } from "@/components/models/Notification";

interface NotificationData {
    id: string; // "0" for new notification
    recipeID: string;
    read: boolean;
    checkDelete: boolean;
    link: string;
}

export const useNotifications = (userID: string): NotificationItemProps[] => {
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
}

export const markNotificationAsRead = (userID: string, notificationID: string): void => {
    const notificationRef = ref(db, `${userID}/notifications/${notificationID}`);
    update(notificationRef, {
        read: true
    });
}

export const deleteNotification = (userID: string, notificationID: string): void => {
    const notificationRef = ref(db, `${userID}/notifications/${notificationID}`);
    remove(notificationRef);
}

export const addNotification = (
    userID: string,
    content: string,
    link: string,
    recipeID: string
): string => {
    const newNotificationRef = push(ref(db, `${userID}/notifications`));
    const notificationID = newNotificationRef.key as string;
    set(newNotificationRef, {
        notificationID,
        content,
        date: new Date().toISOString(),
        read: false,
        link,
        recipeID,
    });

    return notificationID;
}

export const checkIfUserNotification = (userID: string, notificationID: string) => {
    const notificationRef = ref(db, `${userID}/notifications/${notificationID}`);

    let exists = false;

    onValue(notificationRef, (snapshot) => {
        if (snapshot.exists()) {
            exists = true;
        }
    });

    off(notificationRef, 'value');

    return exists;
}