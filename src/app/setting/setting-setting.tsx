import { View, Text, Button, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import Help from './help';
import foundation from './foundation';

export default function Setting() {
    const navigationSetting = useNavigation();
    return (
        <ScrollView>
            <Text>Setting</Text>
            <Button title="Help" onPress={navigateToStack(navigationSetting, "help")} />
            <Button title="Foundation"  onPress={navigateToStack(navigationSetting, "foundation")} />
            <Button title="Log out"  onPress={navigateToStack(navigationSetting, "log-out")} />
        </ScrollView>
    );
}