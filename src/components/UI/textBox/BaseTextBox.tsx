import { SignBoxStyles } from '@/styles/Sign';
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';

export interface BaseTextBoxProps extends TextInputProps {
    style?: object;
    outerStyle?: ViewStyle;
}

export class BaseTextBox extends React.Component<BaseTextBoxProps> {
    render() {
        const { style, ...otherProps } = this.props;
        return (
        <View style={this.props.outerStyle}>
            <TextInput
            style={style}
            {...otherProps}
            />
        </View>
        );
    }
}
