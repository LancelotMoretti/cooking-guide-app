import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonPublishStyles } from '@/constants/AddRecipe';

interface ButtonProps {
    buttonText: string;
    onPress: any;
}

const ButtonPublish: React.FC<ButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={ButtonPublishStyles.container} onPress={onPress}>
            <Text style={ButtonPublishStyles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default ButtonPublish;