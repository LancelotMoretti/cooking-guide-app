import React from 'react';
import { Text, TextProps, GestureResponderEvent, StyleSheet } from 'react-native';
import { ClickableObject } from './ClickableObject';
import { ClickableStyles } from '@/styles/ClickableObject';

interface ClickableTextProps extends TextProps {
    onPress: (event: GestureResponderEvent) => void;
}

export class ClickableText extends React.Component<ClickableTextProps> {
    render() {
        const { onPress, style, children, ...otherProps } = this.props;
        return (
        <ClickableObject onPress={onPress}>
            <Text {...otherProps} style={[ClickableStyles.clickableText, style]}>
            {children}
            </Text>
        </ClickableObject>
        );
    }
}