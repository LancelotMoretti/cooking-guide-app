import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { ButtonTrashStyles } from '@/constants/AddRecipe';

interface ButtonProps {

    onPress: any;
}

const ButtonTrash: React.FC<ButtonProps> = ({onPress}) => {
    return (
        <View style={ButtonTrashStyles.container}>
            <TouchableOpacity style={ButtonTrashStyles.button} onPress={onPress}>
                <Image source={require('../../assets/images/Trash.png')} />
            </TouchableOpacity>
        </View>
    );
};

export default ButtonTrash;