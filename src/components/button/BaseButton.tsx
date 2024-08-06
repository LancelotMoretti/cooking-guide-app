import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface BaseButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
}

export class BaseButton extends React.Component<BaseButtonProps> {
    render() {
        const { title, onPress, style } = this.props;
        return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});