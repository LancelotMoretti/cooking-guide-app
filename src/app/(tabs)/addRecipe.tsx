import { View, Text, StyleSheet } from 'react-native';
import { AddRecipeHeader } from '@/constants/Header';
import Checkbox from '@/components/addRecipe/Checkbox'
import SignButton from '@/components/addRecipe/SignButton';
import SignBox from '@/components/addRecipe/SignTextBox';
import { navigateToStack } from '@/hooks/useNavigateScreen';
import { useState } from 'react';

export default function AddRecipe() {
    const [description, setDescription] = useState('');
    return (
        
        <View >
            <Text style={AddRecipeHeader}>Create Recipe</Text>

            <View style={styles.button}>
                <SignButton buttonText="Publish" onPress={navigateToStack("(tabs)")}/>
                <SignButton buttonText="Delete" onPress={navigateToStack("(tabs)")}/>
                    
            </View>
            <View style={styles.box}>
                <SignBox 
                    label="Description"
                    placeholder="Recipe description"
                    secureTextEntry={false}
                    value={description}
                    onChangeText={setDescription}
                    onIconPress={() => {}}
            />
            </View>
        </View>
        
        
    );
}


const styles = StyleSheet.create({
    button: {
        flexDirection : 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
    },
    box: {
        marginTop: 20,
        marginHorizontal: 30,
    }
});