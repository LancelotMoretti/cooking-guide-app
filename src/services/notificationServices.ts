import { db } from "@/firebaseConfig";
import { ref, update, remove, push, onValue, off } from "firebase/database";
import { useEffect, useState } from "react";
import { NotificationItemProps, NotificationData } from "@/components/notification/NotificationItem";

export const readNotification = (userID: string): NotificationItemProps[] => {
    const [notifications, setNotifications] = useState<NotificationItemProps[]>([]);

    useEffect(() => {
        const notificationsRef = ref(db, `${userID}/notifications`);

        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const notificationsArray: NotificationItemProps[] = Object.keys(data).map(key => ({
                    notification: {
                        id: key,
                        recipeID: data[key].recipeID,
                        read: data[key].read,
                        checkDelete: data[key].checkDelete,
                        link: data[key].link,
                    },
                    onReadChange: () => {},
                    onDeleted: () => {},
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