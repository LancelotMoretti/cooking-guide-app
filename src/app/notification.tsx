import React, { useState } from 'react';
import { View } from 'react-native';
import { readNotification, writeNotification } from '@/services/notificationServices';
import { NotificationScreenStyles } from '@/styles/Notification';
import NotificationFilter from '@/components/notification/NotificationFilter';
import NotificationList from '@/components/notification/NotificationList';

// const testList = [
//   {
//     id: '',
//     newRecipe: false,
//     title: 'Test title 1',
//     author: 'Test author 1',
//     time: new Date('2022-09-01T10:00:00Z'),
//     read: false,
//     checkDelete: false,
//     link: 'https://google.com',
//   },

//   {
//     id: '',
//     newRecipe: true,
//     title: 'Test title 2',
//     author: 'Test author 2',
//     time: new Date('2022-09-01T10:00:01Z'),
//     read: false,
//     checkDelete: false,
//     link: 'https://google.com',
//   },

//   {
//     id: '',
//     newRecipe: false,
//     title: 'Test title 3',
//     author: 'Test author 3',
//     time: new Date('2022-09-01T10:00:02Z'),
//     read: true,
//     checkDelete: false,
//     link: 'https://google.com',
//   },
// ];

// for (let i = 0; i < testList.length; i++) {
//   writeNotification({ userID: 1, props: testList[i] });
// }

export default function Notification (userID: string) {
  userID = "1"; // Đang test nên để mặc định userID = 1
  const list = readNotification(userID);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all'); 

  return (
    <View style={NotificationScreenStyles.container}>
      <NotificationFilter filter={filter} setFilter={setFilter} />
      <NotificationList list={list} filter={filter} userID={userID} />
    </View>
  );
};