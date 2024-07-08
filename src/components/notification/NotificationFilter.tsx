import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NotificationScreenStyles } from '@/constants/Notification';

interface NotificationFilterProps {
  filter: 'all' | 'read' | 'unread';
  setFilter: (filter: 'all' | 'read' | 'unread') => void;
}

const NotificationFilter: React.FC<NotificationFilterProps> = ({ filter, setFilter }) => {
  return (
    <View style={NotificationScreenStyles.filterContainer}>
      <TouchableOpacity
        style={[NotificationScreenStyles.filterButton, filter === 'all' && NotificationScreenStyles.activeFilter]}
        onPress={() => setFilter('all')}
      >
        <Text style={[NotificationScreenStyles.buttonText, filter === 'all' && NotificationScreenStyles.buttonTextActive]}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[NotificationScreenStyles.filterButton, filter === 'read' && NotificationScreenStyles.activeFilter]}
        onPress={() => setFilter('read')}
      >
        <Text style={[NotificationScreenStyles.buttonText, filter === 'read' && NotificationScreenStyles.buttonTextActive]}>Read</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[NotificationScreenStyles.filterButton, filter === 'unread' && NotificationScreenStyles.activeFilter]}
        onPress={() => setFilter('unread')}
      >
        <Text style={[NotificationScreenStyles.buttonText, filter === 'unread' && NotificationScreenStyles.buttonTextActive]}>Unread</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationFilter;