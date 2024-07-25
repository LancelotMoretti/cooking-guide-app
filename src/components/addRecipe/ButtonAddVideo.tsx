import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { ButtonAddVideoStyles } from '@/constants/AddRecipe';

interface ButtonProps {
    buttonText: string;
    onPress: any;
}

const ButtonAddVideo: React.FC<ButtonProps> = ({ buttonText, onPress}) => {
    return (
        
            <TouchableOpacity style={ButtonAddVideoStyles.container} onPress={onPress}>
                <Image source={require('../../assets/images/addRecipe/video-bot.png')} />
                <Text style={ButtonAddVideoStyles.text}>{buttonText}</Text>
            </TouchableOpacity>
    
    );
};

export default ButtonAddVideo;