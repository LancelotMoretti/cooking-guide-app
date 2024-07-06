import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SignButtonStyles } from '@/constants/Sign';

interface SignButtonProps {
    buttonText: string;
    onPress: any;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 60,
        marginTop: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#129575',
        fontWeight: 'bold',
    },
});
const SignButton: React.FC<SignButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default SignButton;