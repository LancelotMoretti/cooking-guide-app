import React from 'react';
import { Pressable, Image, StyleSheet, GestureResponderEvent, ImageProps, View, ViewStyle, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonIoniconsProps extends ImageProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    outerStyle?: ViewStyle; // Style for the outer View
    iconName: string; // Icon name
    title: string;
}

export class ButtonIonicons extends React.Component<ButtonIoniconsProps> {
    render() {
        const { onPress, style, ...otherProps } = this.props;
        return (
        <View style={this.props.outerStyle}>
        <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
            onPress={onPress}
        >
            <Ionicons name={this.props.iconName as any} size={24} color="black" />
            <Text>{this.props.title}</Text>
        </Pressable>
        </View>
        );
    }
}