import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SignButtonStyles } from '@/constants/Sign';

interface SignButtonProps {
    buttonText: string;
    onPress: any;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#129575',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginTop: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
const SignButtonAdd: React.FC<SignButtonProps> = ({ buttonText, onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

export default SignButtonAdd;