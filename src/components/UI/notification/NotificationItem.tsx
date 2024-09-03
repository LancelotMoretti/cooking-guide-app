import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { useElapsedTime } from '@/hooks/useElapsedTime';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { NotificationBoxStyles } from '@/styles/Notification';
import { useNavigation } from 'expo-router';
import { readRecipeFromDatabase } from '@/temp/recipeServices';
import { Notification } from '../../models/Notification'; // Make sure this path is correct

export interface NotificationItemProps {
  notification: Notification;
  onReadChange: () => void;
  onDeleted: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onReadChange, onDeleted }) => {
  const navigation = useNavigation();
  const [readState, setReadState] = useState<boolean>(notification.isRead());
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const recipe = readRecipeFromDatabase(notification.getRecipeID());

  const handlePress = () => {
    //notification.getRecipeID()
    navigateToStack(navigation, 'recipe-detail', notification.getRecipeID());
  if (!readState) {
      setReadState(true);
      notification.markAsRead();
      onReadChange(); // Call your callback to notify about the state change
  }
  };

  const handleDelete = () => {
    if (!deleteState) {
      setDeleteState(true);
      onDeleted();
    }
  };

  const getShortenedString = (str: string, maxLength: number = 40) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <TouchableOpacity
      style={[
        NotificationBoxStyles.container,
        readState ? NotificationBoxStyles.read : NotificationBoxStyles.unread,
        deleteState ? { display: 'none' } : { display: 'flex' }
      ]}
      onPress={() => navigateToStack(navigation, `/recipe/${notification.getRecipeID()}`)}
      onPressOut={handlePress}
    >
      <Pressable style={NotificationBoxStyles.deleteButtton} onPress={handleDelete}>
        <Image source={require('@/assets/images/delete-icon.jpg')} style={NotificationBoxStyles.icon} />
      </Pressable>
      <View style={NotificationBoxStyles.content}>
        <Text style={NotificationBoxStyles.newRecipe}>{'New Recipe Alert'}</Text>
        <Text style={NotificationBoxStyles.title}>{getShortenedString(recipe?.title || '')}</Text>
        <Text style={NotificationBoxStyles.author}>{"Author: " + (recipe?.userID || '')}</Text>
        <Text style={NotificationBoxStyles.time}>{useElapsedTime({ time: new Date(notification.getDate()) })}</Text>
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