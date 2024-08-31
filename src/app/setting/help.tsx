import { View, Text, Button, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useNavigation } from 'expo-router';
import { useState } from 'react';

export default function Help() {
    return (
        <ScrollView>
            <View>
                <Text>Help</Text>
            </View>
        </ScrollView>
    );
}