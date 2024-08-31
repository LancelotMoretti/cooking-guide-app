import { Tabs, Stack } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/routingAndMiddleware/TabBarIcon';
// import Help from './setting/help';

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
                name="recipe-detail"
                options={{
                    title: 'Recipe Detail',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'chatbox' : 'chatbox-outline'} color={color} />
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
                name="edit-recipe"
                options={{
                    title: 'Edit',
                    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
                        <TabBarIcon name={focused ? 'pencil' : 'pencil-outline'} color={color} />
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