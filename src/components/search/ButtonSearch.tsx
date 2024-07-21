import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ButtonSearchStyles } from '@/constants/Search';

interface ButtonProps {
    onPress: any;
}


const ButtonSearch: React.FC<ButtonProps> = ({onPress}) => {
    return (
        <View style={ButtonSearchStyles.container}>
            <TouchableOpacity style={ButtonSearchStyles.button} onPress={onPress}>
                <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default ButtonSearch;
