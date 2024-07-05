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

    if (props.id === "0") {
        const newNotification = push(ref(db, `${userId}/notifications`));
        const newId: string | null = newNotification.key;
        if (newId === null) {
            return;
        }

        update(newNotification, {
            id: newId,
            newRecipe: props.newRecipe,
            title: props.title,
            author: props.author,
            time: props.time,
            read: props.read,
            checkDelete: props.checkDelete,
            link: props.link,
        });
    } else {
        update(ref(db, `${userId}/notifications/${props.id}`), {
            id: props.id,
            newRecipe: props.newRecipe,
            title: props.title,
            author: props.author,
            time: props.time,
            read: props.read,
            checkDelete: props.checkDelete,
            link: props.link,
        });
    }
}