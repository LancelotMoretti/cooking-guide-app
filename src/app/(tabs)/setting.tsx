// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SettingsScreen from '../SettingsScreen';
// import NotificationScreen from '../screens/NotificationScreen';
import HelpScreen from './setting/help';
// import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
// import LanguageScreen from '../screens/LanguageScreen';
// import DarkThemeScreen from '../screens/DarkThemeScreen';
// import LogoutScreen from '../screens/LogoutScreen';

type RootStackParamList = {
  Settings: undefined;
  Notification: undefined;
  HelpCenter: undefined;
  PrivacyPolicy: undefined;
  Language: undefined;
  DarkTheme: undefined;
  Logout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Settings">
        {/* <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} /> */}
        <Stack.Screen name="HelpCenter" component={HelpScreen} />
        {/* <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="DarkTheme" component={DarkThemeScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
