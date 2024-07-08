import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AddRecipeHeader } from '@/constants/Header';
import Checkbox from '@/components/addRecipe/Checkbox'
import SignButton from '@/components/addRecipe/SignButton';
import SignButtonAdd from '@/components/addRecipe/SignButtonAdd';
import SignBoxAmt from '@/components/addRecipe/SignTextBoxIngredient';
import SignBox from '@/components/addRecipe/SignTextBox';
import { useState } from 'react';
import { ClickableText, ClickableLogo } from '@/components/signAccount/ClickableObject';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/services/navigateServices';

export default function AddRecipe() {
    const navigation = useNavigation();
    
    const [description, setDescription] = useState('');
    const [timeRecipe, setTimeRecipe] = useState('');

    return (
        
        <ScrollView >
            <Text style={AddRecipeHeader}>Edit Recipe</Text>

            <View style={styles.button}>
                <SignButton buttonText="Update" onPress={navigateToStack(navigation, "(tabs)")}/>
                <SignButton buttonText="Delete" onPress={navigateToStack(navigation, "(tabs)")}/>
                    
            </View>
            <View style={styles.image}>
                <Image source = {require('../../assets/images/addRecipe/Food.png')} style={{width: '100%'}}/>
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
            <View style={styles.box}>
                <SignBox 
                    label="Time Recipe"
                    placeholder="1hour, 30min,..."
                    secureTextEntry={false}
                    value={timeRecipe}
                    onChangeText={setTimeRecipe}
                    onIconPress={() => {}}
            />
            </View>

            <View style={styles.ingredient}>
                
                <SignBoxAmt 
                    label="Ingredients"
                    placeholder="Amt"
                    secureTextEntry={false}
                    value={description}
                    onChangeText={setDescription}
                    onIconPress={() => {}}
                />
                <SignBoxAmt 
                    label="             "
                    placeholder="Ingredient...                       "
                    secureTextEntry={false}
                    value={description}
                    onChangeText={setDescription}
                    onIconPress={() => {}}
                />
                <View style = {{marginTop: 20}}>
                    <ClickableLogo fileName='trash' onPress={navigateToStack(navigation, "(tabs)")}/>
                </View>
                
                
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
                alignItems: "center"
            }}>

                <SignButtonAdd buttonText="+ Add Ingredient" onPress={navigateToStack(navigation, "(tabs)")}/>
            </View>

            <View style={styles.ingredient}>
                
                <SignBoxAmt 
                    label="Instructions"
                    placeholder="Instruction 1                                               "
                    secureTextEntry={false}
                    value={description}
                    onChangeText={setDescription}
                    onIconPress={() => {}}
                />

                <View style = {{marginTop: 20}}>
                    <ClickableLogo fileName='trash' onPress={navigateToStack(navigation, "(tabs)")}/>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
                alignItems: "center"
            }}>

                <SignButtonAdd buttonText="+ Add Instruction" onPress={navigateToStack(navigation, "(tabs)")}/>
            </View>
        </ScrollView>
        
        
    );
}


const styles = StyleSheet.create({
    button: {
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        //marginHorizontal: 30,
    },
    image: {
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 30,
    },
    box: {
        //marginTop: 20,
        marginHorizontal: 30,
    },
    ingredient:{
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        //paddingHorizontal: 10,
        marginHorizontal: 30,
    }
});