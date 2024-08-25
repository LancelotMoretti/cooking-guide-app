import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

interface BaseButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    containerStyle?: object;
    style?: object;
}

export class BaseButton extends React.Component<BaseButtonProps> {
    render() {
        const { title, onPress, containerStyle, style } = this.props;
        return (
            <TouchableOpacity style={containerStyle} onPress={onPress}>
                <Text style={style}>{title}</Text>
            </TouchableOpacity>
        );
    }
}