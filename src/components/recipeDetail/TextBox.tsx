import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextBoxIngreStyles } from '@/constants/RecipeDetail';

interface BoxProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const BoxIngredient: React.FC<BoxProps> = ({placeholder, value, onChangeText}) => {
    return (
        <View style={TextBoxIngreStyles.container}>
            <TextInput
                style={TextBoxIngreStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default BoxIngredient;