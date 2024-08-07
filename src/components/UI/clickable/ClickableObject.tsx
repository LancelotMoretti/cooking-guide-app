import React from 'react';
import { Pressable, StyleSheet, GestureResponderEvent, View, ViewProps } from 'react-native';

interface ClickableObjectProps extends ViewProps {
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
}

export class ClickableObject extends React.Component<ClickableObjectProps> {
    render() {
        const { onPress, style, children, ...otherProps } = this.props;
        return (
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, style]} onPress={onPress}>
            <View {...otherProps}>{children}</View>
        </Pressable>
        );
    }
}