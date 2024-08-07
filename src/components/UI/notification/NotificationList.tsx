import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { writeNotification } from "@/temp/notificationServices";
import NotificationItem from "./NotificationItem";
import { Notification } from '../../models/Notification'; // Make sure this path is correct

interface NotificationListProps {
    list: Notification[];
    filter: 'all' | 'read' | 'unread';
    userID: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ list, filter, userID }) => {
    const reversedList = [...list].reverse();

    const handleReadChange = (id: string) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].getNotificationID() === id) {
                if (list[i].isRead()) return;
                list[i].markAsRead();
                writeNotification(userID, list[i]);
                break;
            }
        }
    };

    const handleDeleteChange = (id: string) => {
        // Assuming deletion logic is added here
    };

    const renderItem: ListRenderItem<Notification> = ({ item }) => {
        if (filter === 'all' || (filter === 'read' && item.isRead()) || (filter === 'unread' && !item.isRead())) {
            return (
                <NotificationItem
                    notification={item}
                    onReadChange={() => handleReadChange(item.getNotificationID())}
                    onDeleted={() => handleDeleteChange(item.getNotificationID())}
                />
            );
        }

        return null;
    };

    return (
        <FlatList
            data={reversedList}
            renderItem={renderItem}
            keyExtractor={(item) => item.getNotificationID()}
        />
    );
}

export default NotificationList;