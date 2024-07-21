import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextBoxStyles } from '@/constants/Search';

interface BoxProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const Box: React.FC<BoxProps> = ({placeholder, value, onChangeText}) => {
    return (
        <View style={TextBoxStyles.container}>
            <TextInput
                style={TextBoxStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                value={value}
                onChangeText={onChangeText}
            />
                
        </View>
    );
}

export default Box;

