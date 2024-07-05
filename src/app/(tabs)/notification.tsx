import React, {useState} from 'react';
import {Text, View, FlatList, ListRenderItem, TouchableOpacity } from 'react-native';
import NotificationItem, { NotificationItemProps } from '@/components/notification/NotificationItem';
import { useReadNotification } from '@/hooks/useReadNotification';
import { useWriteNotification } from '@/hooks/useWriteNotification';
import { NotificationScreenStyles } from '@/constants/Notification';

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
  const list = useReadNotification({userId});
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all'); 

  const handleReadChange = (id: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].notification.id === id) {
        list[i].notification.read = true;
        useWriteNotification({userId, props: list[i].notification});
        break;
      }
    }
  }

  const handleDeleteChange = (id: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].notification.id === id) {
        list[i].notification.checkDelete = true;
        useWriteNotification({userId, props: list[i].notification});
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
    <View style={NotificationScreenStyles.container}>
      <View style={NotificationScreenStyles.filterContainer}>
        <TouchableOpacity
          style={[NotificationScreenStyles.filterButton, filter === 'all' && NotificationScreenStyles.activeFilter]}
          onPress={() => handleFilterPress('all')}
        >
          <Text style={[NotificationScreenStyles.buttonText, filter === 'all' && NotificationScreenStyles.buttonTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[NotificationScreenStyles.filterButton, filter === 'read' && NotificationScreenStyles.activeFilter]}
          onPress={() => handleFilterPress('read')}
        >
          <Text style={[NotificationScreenStyles.buttonText, filter === 'read' && NotificationScreenStyles.buttonTextActive]}>Read</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[NotificationScreenStyles.filterButton, filter === 'unread' && NotificationScreenStyles.activeFilter]}
          onPress={() => handleFilterPress('unread')}
        >
          <Text style={[NotificationScreenStyles.buttonText, filter === 'unread' && NotificationScreenStyles.buttonTextActive]}>Unread</Text>
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

export default Notification;