import React, {useState} from 'react';
import {Text, View, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import NotificationItem, {NotificationItemProps } from '@/components/notification/NotificationItem';
import useReadNotifications from '@/hooks/readNotification';
import useWriteNotification from '@/hooks/writeNotification';

  // // Test data
  // const listTest = [
  //   {
  //     id: '1',
  //     newRecipe: true,
  //     title: 'New recipe',
  //     author: 'Author',
  //     time: new Date(),
  //     read: false,
  //     checkDelete: false,
  //     link: 'sign-up',
  //   },
  //   {
  //     id: '2',
  //     newRecipe: false,
  //     title: 'New notification',
  //     author: 'Author',
  //     time: new Date(),
  //     read: false,
  //     checkDelete: false,
  //     link: 'sign-in',
  //   },
  //   {
  //     id: '0',
  //     newRecipe: false,
  //     title: 'New notification',
  //     author: 'Author',
  //     time: new Date(),
  //     read: false,
  //     checkDelete: false,
  //     link: 'sign-in',
  //   }
  // ]

  // for (let i = 0; i < listTest.length; i++) {
  //   useWriteNotification(1, listTest[i]);
  // }

const Notification = (userId: number) => {
  userId = 1; // Đang test nên để mặc định userId = 1
  const list = useReadNotifications(userId);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all'); 

  const handleReadChange = (id: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].notification.id === id) {
        list[i].notification.read = true;
        useWriteNotification(userId, list[i].notification);
        break;
      }
    }
  }

  const handleDeleteChange = (id: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].notification.id === id) {
        list[i].notification.checkDelete = true;
        useWriteNotification(userId, list[i].notification);
        break;
      }
    }
  }

  const renderItem: ListRenderItem<NotificationItemProps> = ({item}) => {
    if (!item.notification.checkDelete && (filter === 'all' || (filter === 'read' && item.notification.read) || (filter === 'unread' && !item.notification.read))) {
      return (
        <NotificationItem
          notification={item.notification}
          onReadChange={() => handleReadChange(item.notification.id)}
          onDeleted={() => handleDeleteChange(item.notification.id)}
        />
      )
    }

    return null;
  };

  const handleFilterPress = (selectedFilter: 'all' | 'read' | 'unread') => {
    setFilter(selectedFilter);
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => handleFilterPress('all')}
        >
          <Text style={[styles.buttonText, filter === 'all' && styles.buttonTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'read' && styles.activeFilter]}
          onPress={() => handleFilterPress('read')}
        >
          <Text style={[styles.buttonText, filter === 'read' && styles.buttonTextActive]}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'unread' && styles.activeFilter]}
          onPress={() => handleFilterPress('unread')}
        >
          <Text style={[styles.buttonText, filter === 'unread' && styles.buttonTextActive]}>Unread</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.notification.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#129575',
    color: '#129575',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 18,
    color: '#129575',
  },
  buttonTextActive: {
    color: '#fff',
  },
});

export default Notification;