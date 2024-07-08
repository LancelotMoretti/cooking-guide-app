import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { useWriteNotification } from "@/hooks/useWriteNotification";
import NotificationItem, { NotificationItemProps } from "./NotificationItem";

export interface NotificationListProps {
    list: NotificationItemProps[];
    filter: 'all' | 'read' | 'unread';
    userId: number;
}

const NotificationList: React.FC<NotificationListProps> = ({ list, filter, userId }) => {
    const reversedList = [...list].reverse();

    const handleReadChange = (id: string) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].notification.id === id) {
                if (list[i].notification.read) return;
                list[i].notification.read = true;
                useWriteNotification({ userId, props: list[i].notification });
                break;
            }
        }
    };

    const handleDeleteChange = (id: string) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].notification.id === id) {
                list[i].notification.checkDelete = true;
                useWriteNotification({ userId, props: list[i].notification });
                break;
            }
        }
    };

    const renderItem: ListRenderItem<NotificationItemProps> = ({ item }) => {
        if (!item.notification.checkDelete && (filter === 'all' || (filter === 'read' && item.notification.read) || (filter === 'unread' && !item.notification.read))) {
            return (
                <NotificationItem
                    notification={item.notification}
                    onReadChange={() => handleReadChange(item.notification.id)}
                    onDeleted={() => handleDeleteChange(item.notification.id)}
                />
            );
        }

        return null;
    };

    return (
        <FlatList
            data={reversedList}
            renderItem={renderItem}
            keyExtractor={(item) => item.notification.id}
        />
    );
}

export default NotificationList;