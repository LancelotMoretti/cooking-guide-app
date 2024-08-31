import React from 'react';
import { Pressable, Image, StyleSheet, GestureResponderEvent, ImageProps, View, ViewStyle, Text } from 'react-native';


interface ButtonImageTextProps extends ImageProps {
    onPress: (event: GestureResponderEvent) => void;
    outerStyleContainer?: ViewStyle; // Style for the outer View
    interStyleContainer?: ViewStyle; // Style for the outer View
    IoncStyle?: ViewStyle; // Style for the outer View
    TextStyle?: ViewStyle; // Style for the outer View
    title: string;
}

export class ButtonImageText extends React.Component<ButtonImageTextProps> {
    render() {
        const { onPress, style, ...otherProps } = this.props;
        return (
        <View style={this.props.outerStyleContainer}>
            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
                onPress={onPress}
            >
            <View style = {this.props.interStyleContainer}>
                <View style = {this.props.IoncStyle}>
                    <Image {...otherProps}/>
                </View>
                <Text style = {this.props.TextStyle}>{this.props.title}</Text>
                
            </View>
            </Pressable>
        </View>
        );
    }
}