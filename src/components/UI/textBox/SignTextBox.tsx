import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseTextBox, BaseTextBoxProps } from './BaseTextBox';
import { SignBoxStyles } from '@/styles/Sign';

export class SignTextBox extends BaseTextBox {
    render() {
        return (
            <View style={SignBoxStyles.container}>
                <View style={SignBoxStyles.inputContainer}>
                    {super.render()}
                </View>
            </View>
        );
    }
}

export const SecureSignTextBox: React.FC<BaseTextBoxProps> = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <View style={props.style}>
            <View style={SignBoxStyles.inputContainer}>
                <TextInput
                    {...props}
                    style={SignBoxStyles.input}
                    secureTextEntry={secureTextEntry}
                />
                {<TouchableOpacity
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    style={SignBoxStyles.icon}
                >
                    <Ionicons
                    name={secureTextEntry ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
};