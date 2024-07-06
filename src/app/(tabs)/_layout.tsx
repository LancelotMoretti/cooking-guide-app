import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="addRecipe"
                options={{
                    title: 'Create Recipe',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'pencil' : 'pencil-sharp'} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Notification',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}