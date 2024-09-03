import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRecipe } from '@/components/services/recipeService';
import { Recipe } from '@/components/models/Recipe';
import { ImageBackground } from 'react-native';
import { TextBox } from '@/components/UI/textBox/TextBox';
import { readUserID } from '@/components/services/profileService';
import { ButtonEditRecipe } from '@/components/UI/button/Button';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';

export default function RecipeDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const recipeID = (route.params as { header: string })?.header;
    const userID: string | null = readUserID(); // Fetch
    //console.log(userID);
    //console.log(recipeID);
    
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (recipeID) { // Only fetch data if recipeID is defined
            const fetchRecipe = async () => {
                try {
                    setLoading(true);
                    const fetchedRecipe = await getRecipe(recipeID);
                    setRecipe(fetchedRecipe);
                } catch (error) {
                    console.error("Error fetching recipe:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRecipe();
       }
    }, [recipeID]); // Add recipeID as a dependency

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!recipe) {
        return <Text>No recipe found.</Text>;
    }

    // console.log(recipe.userID);
    // console.log(userID);
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.container}>
                
                {userID == recipe.userID && (
                <ButtonEditRecipe
                    title="Edit" 
                    onPress={() => navigateToStack(navigation, 'edit-recipe', recipeID)()}
                />)}
                
                <View style={styles.image}>
                <ImageBackground
                            source={{ uri: recipe.video }}
                            style={styles.backgroundVideo}
                            imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
                        />
                </View>
                <View style={styles.titleContainer}>
                    <TextInput style={styles.title} value={recipe.title} />

                      
                </View>
            

                <Text style={styles.sectionTitle}>Details</Text>
                <Text style={styles.descriptionText}>{recipe.description}</Text>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                    {recipe.ingredients?.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <Text style={styles.ingredientDescription}>{ingredient.name}</Text>
                            <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Instructions</Text>
                <View style={styles.instructionsList}>
                    {recipe.steps?.map((instruction, index) => (
                        <View key={index} style={styles.instruction}>
                            <Text style={styles.instructionStep}>Step {index + 1}</Text>
                            <Text>{instruction}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Comments</Text>
                
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
    },
    image: {
        marginBottom: 10,
    },
    titleContainer: {
        borderRadius: 20,
    },
    title: {
        borderRadius: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        backgroundColor: '#129575',
        padding: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#129575',
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 20,
    },
    ingredientsList: {
        marginBottom: 20,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
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
        //alignSelf: 'center',
        marginBottom: 5,
        backgroundColor: '#9FEADF',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    instructionStep: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    backgroundVideo: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        minHeight: 200,
        marginBottom: 20,
      },
});
