import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BoxStyles from '@/styles/InputBox';

interface InputTextBoxProps {
    label: string;
    placeholder: string;
    secureTextEntry: boolean;
    value: string;
    onChangeText: (text: string) => void;
    onIconPress: any;
}

const InputTextBox = ({ label, placeholder, secureTextEntry, value, onChangeText, onIconPress }: InputTextBoxProps) => {
    return (
        <View style={BoxStyles.container}>
            <Text style={BoxStyles.label}>{label}</Text>
            <View style={BoxStyles.inputContainer}>
                <TextInput
                style={BoxStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                />
                {secureTextEntry && (
                <TouchableOpacity onPress={onIconPress} style={BoxStyles.icon}>
                    <Ionicons name="eye-off" size={24} color="black" />
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default InputTextBox;