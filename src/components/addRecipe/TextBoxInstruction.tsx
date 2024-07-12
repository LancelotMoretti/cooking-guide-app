import React from 'react';
import { View, Text, TextInput} from 'react-native';
import { TextBoxInstrStyles } from '@/constants/AddRecipe';

interface BoxProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}

const BoxInstruction: React.FC<BoxProps> = ({placeholder, value, onChangeText}) => {
    return (
        <View style={TextBoxInstrStyles.container}>
            <TextInput
                style={TextBoxInstrStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

export default BoxInstruction;