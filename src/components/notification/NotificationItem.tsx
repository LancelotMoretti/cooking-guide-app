import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable,  } from 'react-native';
import { useElapsedTime } from '@/hooks/useElapsedTime';
import { navigateToStack } from '@/hooks/useNavigateScreen';
import { NotificationBoxStyles } from '@/constants/Notification';

export interface NotificationData {
  id: string; // "0" for new notification
  newRecipe: boolean; // True: new recipe, False: new notification
  title: string;
  author: string;
  time: Date;
  read: boolean;
  checkDelete: boolean;
  link: string;
}

export interface NotificationItemProps {
  notification: NotificationData;
  onReadChange: () => void;
  onDeleted: () => void;
}

const NotificationItem = ({notification, onReadChange, onDeleted}: NotificationItemProps) => {
  const [readState, setReadState] = useState<boolean>(notification.read);
  const [deleteState, setDeleteState] = useState<boolean>(notification.checkDelete);
  
  const handlePress = () => {
    if (readState === false) {
      setReadState(true);
      onReadChange();
    }
  };

  const handleDelete = () => {
    if (deleteState === false) {
      setDeleteState(true);
      onDeleted();
    }
  }

  const getShortenedString = (str: string, maxLength: number = 40) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <TouchableOpacity
      style={[NotificationBoxStyles.container, readState ? NotificationBoxStyles.read : NotificationBoxStyles.unread, deleteState ? {display: 'none'} : {display: 'flex'}]}
      onPress={navigateToStack(notification.link)}
      onPressOut={handlePress}
    >
      <Pressable style={NotificationBoxStyles.deleteButtton} onPress={handleDelete}>
        <Image source={require('@/assets/images/delete-icon.jpg')} style={NotificationBoxStyles.icon} />
      </Pressable>
      <View style={NotificationBoxStyles.content}>
        <Text style={NotificationBoxStyles.newRecipe}>{notification.newRecipe ? 'New Recipe Alert' : 'New Notification'}</Text>
        <Text style={NotificationBoxStyles.title}>{getShortenedString(notification.title)}</Text>
        <Text style={NotificationBoxStyles.author}>{"Author: " + notification.author}</Text>
        <Text style={NotificationBoxStyles.time}>{useElapsedTime({time: notification.time})}</Text>
      </View>
      {!readState && (
        <View style={NotificationBoxStyles.iconContainer}>
          <Text style={NotificationBoxStyles.icon}>●</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NotificationItem;