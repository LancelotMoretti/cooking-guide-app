import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonStyles } from '@/constants/AddRecipe';

interface ButtonProps {
    buttonText: string;
    onPress: any;
}

const Button: React.FC<ButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={ButtonStyles.container} onPress={onPress}>
            <Text style={ButtonStyles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default Button;