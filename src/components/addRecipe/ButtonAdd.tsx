import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonAddStyles } from '@/constants/AddRecipe';

interface SignButtonProps {
    buttonText: string;
    onPress: any;
}

const ButtonAdd: React.FC<SignButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={ButtonAddStyles.container} onPress={onPress}>
            <Text style={ButtonAddStyles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default ButtonAdd;