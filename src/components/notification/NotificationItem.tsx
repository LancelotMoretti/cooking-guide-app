import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable,  } from 'react-native';
import { useElapsedTime } from '@/hooks/useElapsedTime';
import { navigateToStack } from '@/services/navigateServices';
import { NotificationBoxStyles } from '@/constants/Notification';
import { useNavigation } from 'expo-router';
import { Recipe, readRecipeFromDatabase } from '@/services/recipeServices';
export interface NotificationData {
  id: string; // "0" for new notification
  recipeID: string;
  read: boolean;
  checkDelete: boolean;
  link: string;
}

export interface NotificationItemProps {
  notification: NotificationData;
  onReadChange: () => void;
  onDeleted: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onReadChange, onDeleted }) => {
  const navigation = useNavigation();
  const [recipe] = useState<Recipe | null>(readRecipeFromDatabase(notification.recipeID));
  if (!recipe) return null;
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
      onPress={navigateToStack(navigation, notification.link)}
      onPressOut={handlePress}
    >
      <Pressable style={NotificationBoxStyles.deleteButtton} onPress={handleDelete}>
        <Image source={require('@/assets/images/delete-icon.jpg')} style={NotificationBoxStyles.icon} />
      </Pressable>
      <View style={NotificationBoxStyles.content}>
        <Text style={NotificationBoxStyles.newRecipe}>{'New Recipe Alert'}</Text>
        <Text style={NotificationBoxStyles.title}>{getShortenedString(recipe.title)}</Text>
        <Text style={NotificationBoxStyles.author}>{"Author: " + recipe.userID}</Text>
        <Text style={NotificationBoxStyles.time}>{useElapsedTime({time: recipe.time})}</Text>
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