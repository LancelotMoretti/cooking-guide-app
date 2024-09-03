import { db } from "@/firebaseConfig";
import { set, ref, update, remove, push, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { Notification } from "@/components/models/Notification";

export const useNotifications = (userID: string): Notification[] => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const notificationsRef = ref(db, `users/${userID}/notifications`);

        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const notificationsArray: Notification[] = Object.keys(data).map(key => 
                    Notification.fromPlainObject({
                        notificationID: key,
                        recipeID: data[key].recipeID,
                        date: data[key].date,
                        content: data[key].content,
                        read: data[key].read,
                        link: data[key].link,  // Assuming link is part of Notification
                        // Add any other necessary fields here
                    })
                );
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
    const notificationRef = ref(db, `users/${userID}/notifications/${notificationID}`);
    update(notificationRef, {
        read: true
    });
}

export const deleteNotification = (userID: string, notificationID: string): void => {
    const notificationRef = ref(db, `users/${userID}/notifications/${notificationID}`);
    remove(notificationRef);
}

export const addNotification = (
    userID: string,
    content: string,
    link: string,
    recipeID: string
): string => {
    const newNotificationRef = push(ref(db, `users/${userID}/notifications`));
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
    const notificationRef = ref(db, `users/${userID}/notifications/${notificationID}`);

    let exists = false;

    onValue(notificationRef, (snapshot) => {
        if (snapshot.exists()) {
            exists = true;
        }
    });

    off(notificationRef, 'value');

    return exists;
}