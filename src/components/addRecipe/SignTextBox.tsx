import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SignBoxStyles } from '@/constants/Sign';

interface SignBoxProps {
    label: string;
    placeholder: string;
    secureTextEntry: boolean;
    value: string;
    onChangeText: (text: string) => void;
    onIconPress: any;
    needSecure?: boolean;
}

const SignBox: React.FC<SignBoxProps> = ({ label, placeholder, secureTextEntry, value, onChangeText, onIconPress, needSecure = false }) => {
    return (
        <View style={SignBoxStyles.container}>
            <Text style={SignBoxStyles.label}>{label}</Text>
            <View style={SignBoxStyles.inputContainer}>
                <TextInput
                style={SignBoxStyles.input}
                placeholder={placeholder}
                placeholderTextColor="#9EA0A4"
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                />
                {secureTextEntry ? (
                    <TouchableOpacity onPress={onIconPress} style={SignBoxStyles.icon}>
                        <Ionicons name="eye-off" size={24} color="black" />
                    </TouchableOpacity>
                ) : needSecure ? (
                    <TouchableOpacity onPress={onIconPress} style={SignBoxStyles.icon}>
                    <Ionicons name="eye" size={24} color="black" />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}

export default SignBox;