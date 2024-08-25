import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BaseTextBox, BaseTextBoxProps } from './BaseTextBox';
import { SignBoxStyles } from '@/styles/Sign';

interface SignTextBoxProps extends BaseTextBoxProps {
    containerStyle?: object;
    inputContainerStyle?: object;
    style?: object;
}

export class SignTextBox extends BaseTextBox {
    containerStyle: object | undefined;
    inputContainerStyle: object | undefined;

    constructor(props: SignTextBoxProps) {
        super(props);
        this.containerStyle = props.containerStyle;
        this.inputContainerStyle = props.inputContainerStyle
    }
    render() {
        return (
            <View style={this.containerStyle}>
                <View style={this.inputContainerStyle}>
                    {super.render()}
                </View>
            </View>
        );
    }
}

export const SecureSignTextBox: React.FC<SignTextBoxProps> = (props) => {
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