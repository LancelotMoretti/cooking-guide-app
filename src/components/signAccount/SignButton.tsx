import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SignButtonStyles } from '@/constants/Sign';

interface SignButtonProps {
    buttonText: string;
    onPress: any;
}

const SignButton: React.FC<SignButtonProps> = ({ buttonText, onPress }) => {
    return (
        <TouchableOpacity style={SignButtonStyles.container} onPress={onPress}>
            <Text style={SignButtonStyles.text}>{buttonText}</Text>
        </TouchableOpacity>
    );
}

export default SignButton;