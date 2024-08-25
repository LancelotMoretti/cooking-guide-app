import { SignBoxStyles } from '@/styles/Sign';
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

export interface BaseTextBoxProps extends TextInputProps {
    style?: object;
}

export class BaseTextBox extends React.Component<BaseTextBoxProps> {
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <TextInput
            style={style}
            {...otherProps}
            />
        );
    }
}
