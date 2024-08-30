import React from 'react';
import { Pressable, Image, StyleSheet, GestureResponderEvent, ImageProps, View, ViewStyle } from 'react-native';

interface ButtonImageProps extends ImageProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    outerStyle?: ViewStyle; // Style for the outer View
}

export class ButtonImage extends React.Component<ButtonImageProps> {
    render() {
        const { onPress, style, ...otherProps } = this.props;
        return (
        <View style={this.props.outerStyle}>
        <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]}
            onPress={onPress}
        >
            <Image {...otherProps}/>
        </Pressable>
        </View>
        );
    }
}