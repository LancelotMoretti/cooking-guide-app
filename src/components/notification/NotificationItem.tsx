import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable,  } from 'react-native';
import UseElapsedTime from '@/hooks/useElapsedTime';
import { navigateToStack } from '@/hooks/useNavigateScreen';

export interface NotificationItem{
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
  notification: NotificationItem;
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
      style={[styles.container, readState ? styles.read : styles.unread, deleteState ? {display: 'none'} : {display: 'flex'}]}
      onPress={navigateToStack(notification.link)}
      onPressOut={handlePress}
    >
      <Pressable style={styles.deleteButtton} onPress={handleDelete}>
        <Image source={require('@/assets/images/delete-icon.jpg')} style={styles.icon} />
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.newRecipe}>{notification.newRecipe ? 'New Recipe Alert' : 'New Notification'}</Text>
        <Text style={styles.title}>{getShortenedString(notification.title)}</Text>
        <Text style={styles.author}>{"Author: " + notification.author}</Text>
        <Text style={styles.time}>{UseElapsedTime(notification.time)}</Text>
      </View>
      {!readState && (
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>●</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    cursor: 'pointer',
  },
  content: {
    flex: 1,
  },
  newRecipe: {
    fontWeight: 700,
    fontSize: 18,
  },
  title: {
    color: '#555',
    fontSize: 16,
    fontWeight: 500,
  },
  author: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },
  time: {
    color: '#aaa',
    fontSize: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    color: 'red',
  },
  read: {
    backgroundColor: '#f0f0f0',
  },
  unread: {
    backgroundColor: '#fff',
  },
  deleteButtton: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    padding: 10,
  },
});

export default NotificationItem;
