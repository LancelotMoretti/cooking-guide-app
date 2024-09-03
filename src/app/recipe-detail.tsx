import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRecipe } from '@/components/services/recipeService';
import { Recipe } from '@/components/models/Recipe';
import { ImageBackground } from 'react-native';

export default function RecipeDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const recipeID = (route.params as { header: string })?.header;
    console.log(recipeID);
    
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

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.container}>
                <View style={styles.image}>
                <ImageBackground
                            source={{ uri: recipe.video }}
                            style={styles.backgroundVideo}
                            imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
                        />
                </View>

                <Text style={styles.title}>{recipe.title}</Text>

                <Text style={styles.sectionTitle}>Details</Text>
                <Text>{recipe.description}</Text>

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
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#129575',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#129575',
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
        width: '100%',
        height: 300, // Adjust height as per your needs
      },
});
