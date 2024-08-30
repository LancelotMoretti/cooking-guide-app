// src/screens/NotificationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification Screen</Text>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00a57d',
  },
});
