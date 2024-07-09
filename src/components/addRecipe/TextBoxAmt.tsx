import React from 'react';
import { View, Text, TextInput} from 'react-native';
import { TextBoxAmtStyles } from '@/constants/AddRecipe';

interface BoxProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const BoxAmt: React.FC<BoxProps> = ({placeholder, value, onChangeText}) => {
    return (
        <View style={TextBoxAmtStyles.container}>
            <TextInput
                style={TextBoxAmtStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default BoxAmt;