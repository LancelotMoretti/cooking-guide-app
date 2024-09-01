import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/routingAndMiddleware/TabBarIcon';
// import Help from './setting/help';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                backgroundColor: '#E1F2F7',
                borderRadius: 25,
                paddingVertical: 10,
                paddingHorizontal: 20,
                position: 'absolute',
                bottom: 10,
                left: 20,
                right: 20,
                height: 70,
                },
                tabBarShowLabel: false,
            }}
        >
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
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="add-recipe"
                options={{
                    title: 'Create Recipe',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'add' : 'add-sharp'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}