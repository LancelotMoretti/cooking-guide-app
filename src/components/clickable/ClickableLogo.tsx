import React from 'react';
import { Image, ImageProps, GestureResponderEvent } from 'react-native';
import { ClickableObject } from './ClickableObject';
import { ClickableStyles } from '@/styles/ClickableObject';

interface ClickableLogoProps extends ImageProps {
    onPress: (event: GestureResponderEvent) => void;
}

export class ClickableLogo extends React.Component<ClickableLogoProps> {
    render() {
        const { onPress, style, ...otherProps } = this.props;
        return (
            <ClickableObject onPress={onPress} style={[ClickableStyles.clickableLogo, {width: 30, height: 30}]}>
                <Image {...otherProps} />
            </ClickableObject>
        );
    }
}