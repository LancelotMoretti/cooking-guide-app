import { db } from "@/firebaseConfig";
import { ref, update, remove, push } from "firebase/database";
import { NotificationData } from "@/components/notification/NotificationItem";

interface UseWriteNotificationProps {
    userId: number;
    props: NotificationData;
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