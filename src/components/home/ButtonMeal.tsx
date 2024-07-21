import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonMealStyles } from '@/constants/Home';

interface ButtonProps {
    buttonText: string;
    onPress: any;
}

const ButtonMeal: React.FC<ButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={ButtonMealStyles.container} onPress={onPress}>
            <Text style={ButtonMealStyles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default ButtonMeal;