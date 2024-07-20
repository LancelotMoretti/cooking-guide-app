import { ScrollView, View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { RecipeDetailHeader } from '@/constants/Header';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/services/navigateServices';
import { remove } from 'firebase/database';
import { saveNewRecipe, writeRecipeToDatabase } from '@/services/recipeServices';
import { writeNotification } from '@/services/notificationServices';
import { Recipe, readRecipeFromDatabase } from '@/services/recipeServices';
import BoxIngredient from '@/components/recipeDetail/TextBox';


export default function RecipeDetail() {
    const navigation = useNavigation();
    const recipe = readRecipeFromDatabase('-O2EVWGU1sE8jdrLgimQ');
    
    return(
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >    
        {recipe ? (
        <ScrollView style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../../assets/images/addRecipe/Food.png')} style={{ width: '100%' }} />
            </View>

            <Text style={RecipeDetailHeader}>{recipe.title}</Text>


            <Text style={styles.title}>Details</Text>
            <Text>{recipe.description}</Text>
            
            <Text style={styles.title}>Ingredients</Text>
            <View style={styles.ingredientsList}>{recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientRow}>
                    <Text style={styles.ingredientDescription}>{ingredient.description}</Text>
                    <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                </View>
            ))}

            </View>
            <Text style={styles.title}>Instruction</Text>
            <View style={styles.instructionsList}>{recipe.instructions.map((instruction, index) => (
            <View>
                
                <View key={index} style={styles.instruction}>
                    <Text style={styles.instructionStep}>Step {index+1}</Text>
                    <Text>{instruction}</Text>
                </View>
            </View>
            ))}
            </View>
        

        </ScrollView>
        ) : (
            <Text>Loading...</Text>
          )}
        </KeyboardAvoidingView>
    );


}

const styles = StyleSheet.create({
    container: {
        
        marginHorizontal: 30,
      },
    button: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
    },
    modalTitle: {
    
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#129575',
    },

    image: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#129575',
    },
    
    
    ingredientsList: {
        marginBottom: 20,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,

    },

    ingredientTextContainer: {
        flex: 1,
      },
      ingredientDescription: {
        fontSize: 16,
      },
      ingredientAmount: {
        color: 'gray',
      },

    instructionsList: {
        marginBottom: 20,
    },
    instruction: {

        alignSelf: 'center',
        marginBottom: 5,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    instructionStep: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    
    
});