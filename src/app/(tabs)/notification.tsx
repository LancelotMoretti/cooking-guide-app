import React, { useState } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import NotificationItem, { NotificationItemProps } from '@/components/notification/NotificationItem';
import { useReadNotification } from '@/hooks/useReadNotification';
import { useWriteNotification } from '@/hooks/useWriteNotification';
import { NotificationScreenStyles } from '@/constants/Notification';
import NotificationFilter from '@/components/notification/NotificationFilter';

const testList = [
  {
    id: '',
    newRecipe: false,
    title: 'Test title 1',
    author: 'Test author 1',
    time: new Date('2022-09-01T10:00:00Z'),
    read: false,
    checkDelete: false,
    link: 'https://google.com',
  },

  {
    id: '2',
    newRecipe: true,
    title: 'Test title 2',
    author: 'Test author 2',
    time: new Date('2022-09-01T10:00:01Z'),
    read: false,
    checkDelete: false,
    link: 'https://google.com',
  },

  {
    id: '3',
    newRecipe: false,
    title: 'Test title 3',
    author: 'Test author 3',
    time: new Date('2022-09-01T10:00:02Z'),
    read: true,
    checkDelete: false,
    link: 'https://google.com',
  },
];

for (let i = 0; i < testList.length; i++) {
  useWriteNotification({ userId: 1, props: testList[i] });
}

export default function Notification (userId: number) {
  userId = 1; // Đang test nên để mặc định userId = 1
  const list = useReadNotification({ userId });
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all'); 

  const handleReadChange = (id: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].notification.id === id) {
        if(list[i].notification.read) return;
        list[i].notification.read = true;
        useWriteNotification({ userId, props: list[i].notification });
        break;
      }
    }
  };

  const handleDeleteChange = (id: string) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].notification.id === id) {
        list[i].notification.checkDelete = true;
        useWriteNotification({ userId, props: list[i].notification });
        break;
      }
    }
  };

  const renderItem: ListRenderItem<NotificationItemProps> = ({ item }) => {
    if (!item.notification.checkDelete && (filter === 'all' || (filter === 'read' && item.notification.read) || (filter === 'unread' && !item.notification.read))) {
      return (
        <NotificationItem
          notification={item.notification}
          onReadChange={() => handleReadChange(item.notification.id)}
          onDeleted={() => handleDeleteChange(item.notification.id)}
        />
      );
    }

    return null;
  };

  return (
    <View style={NotificationScreenStyles.container}>
      <NotificationFilter filter={filter} setFilter={setFilter} />
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.notification.id}
      />
    </View>
  );
};