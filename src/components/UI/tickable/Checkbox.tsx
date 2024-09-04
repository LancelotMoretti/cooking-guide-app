import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { CheckboxStyles } from '@/styles/Checkbox';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
    content: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ content }) => {
    const [checked, setChecked] = useState(false);

    const handlePress = () => {
        setChecked(!checked);
    };

    return (
        <View style={CheckboxStyles.container}>
        <Pressable onPress={handlePress} style={CheckboxStyles.checkbox}>
            {checked && <View style={CheckboxStyles.checked} />}
        </Pressable>
        <Text onPress={handlePress} style={CheckboxStyles.label}>{content}</Text>
        </View>
    );
}