import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SignBoxStyles } from '@/constants/Sign';

interface SignBoxProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onIconPress: any;
}

const SignBox: React.FC<SignBoxProps> = ({ label, placeholder, value, onChangeText, onIconPress }) => {
    return (
        <View style={SignBoxStyles.container}>
            <Text style={SignBoxStyles.label}>{label}</Text>
            <View style={SignBoxStyles.inputContainer}>
                <TextInput
                style={SignBoxStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                value={value}
                onChangeText={onChangeText}
                />
                
            </View>
        </View>
    );
}

export default SignBox;