import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Profile() {
    return (
        <View
            style={styles.container}>
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})