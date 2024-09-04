import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { NotificationScreenStyles } from '@/styles/Notification';
import NotificationFilter from '@/components/UI/notification/NotificationFilter';
import NotificationList from '@/components/UI/notification/NotificationList';
import { useNotifications } from '../../components/services/notificationService';
import { readUserIDAndUsername } from '@/components/services/profileService';

export default function Notification () {
  const userID: string | null = readUserIDAndUsername()?.userID; // Fetch the user ID
  const list = useNotifications(userID || '') // Use the custom hook to fetch notifications
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all'); 
  
  return (
    <View style={NotificationScreenStyles.container}>
      <View style={{marginTop: 20}}>
        <NotificationFilter filter={filter} setFilter={setFilter} />
        <NotificationList list={list} filter={filter} userID={userID || ''} />
      </View>
    </View>
  );
};