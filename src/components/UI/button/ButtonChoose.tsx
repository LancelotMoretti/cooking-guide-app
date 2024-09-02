import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';

interface BaseButtonChooseProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    selected: boolean;
    containerStyle?: object;
    unselTextStyle?: object;
    selTextStyle?: object;
    unselStyle?: object;
    selStyle?: object;
}

export class ButtonChoose extends React.Component<BaseButtonChooseProps> {
    render() {
        const { title, onPress, selected, containerStyle, unselTextStyle, selTextStyle, unselStyle, selStyle } = this.props;
        return (
            <TouchableOpacity onPress={onPress}
                style={[containerStyle, selected ? selStyle : unselStyle]}
            >
                <Text style={selected ? selTextStyle : unselTextStyle}>{title}</Text>
            </TouchableOpacity>
        );
    }
}