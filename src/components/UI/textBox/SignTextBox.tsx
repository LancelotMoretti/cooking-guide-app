import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseTextBox } from './BaseTextBox';
import { SignBoxStyles } from '@/styles/Sign';

interface SignTextBoxProps extends TextInputProps {
    style?: object;
}

export class SignTextBox extends BaseTextBox {
    render() {
        return super.render();
    }
}

export const SecureSignTextBox: React.FC<SignTextBoxProps> = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <View style={[props.style]}>
        <TextInput
            {...props}
            secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            style={SignBoxStyles.icon}
        >
            <Ionicons
            name={secureTextEntry ? 'eye-off' : 'eye'}
            size={20}
            color="gray"
            />
        </TouchableOpacity>
        </View>
    );
};