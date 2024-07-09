import React from 'react';
import { View, Text, TextInput} from 'react-native';
import { TextBoxIngreStyles } from '@/constants/AddRecipe';

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