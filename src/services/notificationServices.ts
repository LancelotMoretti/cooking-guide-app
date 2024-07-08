import { db } from "@/firebaseConfig";
import { ref, update, remove, push, onValue, off } from "firebase/database";
import { NotificationData } from "@/components/notification/NotificationItem";
import { useEffect, useState } from 'react';
import { NotificationItemProps } from '@/components/notification/NotificationItem'

interface UseWriteNotificationProps {
    userId: number;
    props: NotificationData;
}

interface UseReadNotificationProps {
    userId: number;
}

export function useReadNotification({ userId }: UseReadNotificationProps): NotificationItemProps[] {
    const [notifications, setNotifications] = useState<NotificationItemProps[]>([]);

    useEffect(() => {
        const notificationsRef = ref(db, `${userId}/notifications`);

        const handleData = (snapshot: any) => {
            const data = snapshot.val();
            if (data) {
                const notificationsArray: NotificationItemProps[] = Object.keys(data).map(key => ({
                    notification: {
                        id: data[key].id,
                        newRecipe: data[key].newRecipe,
                        title: data[key].title,
                        author: data[key].author,
                        time: new Date(data[key].time),
                        read: data[key].read,
                        checkDelete: data[key].checkDelete,
                        link: data[key].link
                    },
                    onReadChange: () => {},
                    onDeleted: () => {}
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
    }, [userId]);

    return notifications;
}

export function useWriteNotification({ userId, props }: UseWriteNotificationProps) {
    if (props.checkDelete) {
        remove(ref(db, `${userId}/notifications/${props.id}`));
        return;
    }

    if (props.id === '') {
        const newNotificationRef = push(ref(db, `${userId}/notifications`));
        props.id = newNotificationRef.key as string;
    }
    update(ref(db, `${userId}/notifications/${props.id}`), props);
}