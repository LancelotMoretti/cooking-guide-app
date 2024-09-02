import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { NotificationScreenStyles } from '@/styles/Notification';
import NotificationFilter from '@/components/UI/notification/NotificationFilter';
import NotificationList from '@/components/UI/notification/NotificationList';
import { useNotifications } from '../../components/services/notificationService';

export default function Notification () {
  const userID = "1"; // Default userID for testing
  const list = useNotifications(userID); // Use the custom hook to fetch notifications
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all'); 
  
  return (
    <View style={NotificationScreenStyles.container}>
      <NotificationFilter filter={filter} setFilter={setFilter} />
      <NotificationList list={list} filter={filter} userID={userID} />
    </View>
  );
};