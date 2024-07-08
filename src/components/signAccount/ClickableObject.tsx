import React from 'react';
import { Text, Pressable, Image } from 'react-native';
import { ClickableStyles } from '@/constants/ClickableObject';
import { imageMap } from '@/constants/ImageMap';

interface ClickableTextProps {
    docHeader: string;
    onPress: any;
}

const ClickableText: React.FC<ClickableTextProps> = ({ docHeader, onPress }) => {
    return (
        <Pressable onPress={onPress}>
        <Text style={ClickableStyles.clickableText}>{docHeader}</Text>
        </Pressable>
    );
}

interface ClickableLogoProps {
    fileName: string;
    onPress: any;
}

const ClickableLogo: React.FC<ClickableLogoProps> = ({ fileName, onPress }) => {
    const imageSource = imageMap[fileName] || require('../../assets/images/react-logo.png');

    return (
        <Pressable onPress={onPress}>
          <Image
            source={imageSource} // Adjust the path to your logo image
            style={[ClickableStyles.clickableLogo, { width: 30, height: 30 }]} // Adjust the width and height values as desired
          />
        </Pressable>
    );
}

export { ClickableText, ClickableLogo };