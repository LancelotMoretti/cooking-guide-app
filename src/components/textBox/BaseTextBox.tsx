import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface BaseTextBoxProps extends TextInputProps {
    style?: object;
}

export class BaseTextBox extends React.Component<BaseTextBoxProps> {
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <TextInput
                style={[styles.textBox, style]}
                {...otherProps}
            />
        );
    }
}

const styles = StyleSheet.create({
    textBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
