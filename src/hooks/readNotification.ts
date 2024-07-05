import { useEffect, useState } from 'react';
import { db } from '@/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import { NotificationItemProps } from '@/components/notification/NotificationItem'; // Đảm bảo import interface Notification và NotificationItemProps

export default function useReadNotification(userId: number): NotificationItemProps[] {
    const [notifications, setNotifications] = useState<NotificationItemProps[]>([]);
    const notificationsRef = ref(db, `${userId}/notifications`);

    if (notificationsRef === null) {
        return [];
    }

    useEffect(() => {
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
};