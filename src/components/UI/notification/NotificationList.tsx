import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import NotificationItem from "./NotificationItem";
import { Notification } from '../../models/Notification'; // Make sure this path is correct
import { markNotificationAsRead, deleteNotification } from '../../services/notificationService'; // Import Firebase services

interface NotificationListProps {
    list: Notification[];
    filter: 'all' | 'read' | 'unread';
    userID: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ list, filter, userID }) => {
    // Reverse the list to display the most recent notifications at the top
    const reversedList = [...list].reverse();

    // Handle marking a notification as read
    const handleReadChange = (id: string) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].getNotificationID() === id) {
                if (list[i].isRead()) return; // If already read, do nothing
                list[i].markAsRead(); // Mark as read in the local list
                markNotificationAsRead(userID, id); // Update Firebase
                break;
            }
        }
    };

    // Handle deleting a notification
    const handleDeleteChange = (id: string) => {
        deleteNotification(userID, id); // Remove from Firebase
    };
        
    // Render each notification item
    const renderItem: ListRenderItem<Notification> = ({ item }) => {
        // Filter notifications based on the selected filter
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
};

export default NotificationList;