import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Recipe } from '@/components/models/Recipe';
import { getRecipes } from '@/components/services/recipeService';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';

// Define the type for filtered recipes
type FilteredRecipes = { [key: string]: { id: string; title: string; image: string; time: { hour: number; minute: number }; rating: number }[] };

// Function to filter recipes by meal type
function filterRecipesByMeal(recipes: Recipe[]): FilteredRecipes {
    const categorizedRecipes: FilteredRecipes = {
        Breakfast: [],
        Lunch: [],
        Dinner: []
    };

    recipes.forEach((recipe) => {
        const recipeData = {
            id: recipe.recipeID,
            title: recipe.title,
            image: recipe.video || '../../assets/images/logo.png', // Replace with actual image logic if available
            time: recipe.duration,
            rating: recipe.rating,
        };

        if (recipe.meal?.breakfast) {
            categorizedRecipes.Breakfast.push(recipeData);
        }
        if (recipe.meal?.lunch) {
            categorizedRecipes.Lunch.push(recipeData);
        }
        if (recipe.meal?.dinner) {
            categorizedRecipes.Dinner.push(recipeData);
        }
    });

    return categorizedRecipes;
}

const Home = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('Breakfast');
    const [filteredRecipes, setFilteredRecipes] = useState<FilteredRecipes>({
        Breakfast: [],
        Lunch: [],
        Dinner: []
    });

    // Fetch recipes and categorize them on component mount
    useEffect(() => {
        getRecipes().then((recipes) => {
            const categorizedRecipes = filterRecipesByMeal(recipes);
            setFilteredRecipes(categorizedRecipes);
        });
    }, []);

    // Handler for category selection
    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
    };

    // Handler for recipe press
    const handleRecipePress = (recipeId: string) => {
        navigateToStack(navigation, 'RecipeDetail', recipeId);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi!</Text>
                <Text style={styles.subGreeting}>What are you cooking today?</Text>
            </View>

            {/* Category Buttons */}
            <View style={styles.categoryContainer}>
                {['Breakfast', 'Lunch', 'Dinner'].map((category) => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => handleCategoryPress(category)}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.categoryButtonSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === category && styles.categoryButtonTextSelected,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Render Recipes directly */}
            {filteredRecipes[selectedCategory].map((item) => (
                <TouchableOpacity key={item.id} style={styles.recipeCard} onPress={() => navigateToStack(navigation, 'recipe-detail', item.id)()}>
                    <View style={styles.recipeMeal}>
                        <ImageBackground source={{ uri: item.image }} style={styles.recipeImage} imageStyle={{ borderRadius: 10 }} />
                        <View>
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                            <Text>{item.time?.hour}h {item.time?.minute}m</Text>
                            <Text>{item.rating} ⭐</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            ))}
    
            {/* Additional Sections like Trending and Saved */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Recipe</Text>
                <View style={styles.trendingRecipe}>
                    <Image style={styles.recipeImage} source={{ uri: 'placeholder_image.png' }} />
                    <View style={styles.recipeInfo}>
                        <Text style={styles.recipeTitle}>Food</Text>
                        <Text style={styles.recipeDescription}>Description</Text>
                        <View style={styles.recipeMeta}>
                            <Text style={styles.recipeTime}>Time</Text>
                            <Text style={styles.recipeRating}>Rating</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Saved</Text>
                <View style={styles.yourRecipes}>
                    <View style={styles.yourRecipeCard}>
                        <Image style={styles.yourRecipeImage} source={{ uri: 'placeholder_image.png' }} />
                        <Text style={styles.yourRecipeTitle}>Title</Text>
                        <Text style={styles.yourRecipeTime}>Time</Text>
                    </View>
                    <View style={styles.yourRecipeCard}>
                        <Image style={styles.yourRecipeImage} source={{ uri: 'placeholder_image.png' }} />
                        <Text style={styles.yourRecipeTitle}>Title</Text>
                        <Text style={styles.yourRecipeTime}>Time</Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 100}}></View>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 16,
        paddingTop: 20,
        paddingBottom: 60,
    },
    header: {
        marginTop: 20,
        marginBottom: 16,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#129575',
    },
    subGreeting: {
        fontSize: 18,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    categoryButton: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#E3F6F5',
    },
    categoryButtonSelected: {
        backgroundColor: '#129575',
    },
    categoryButtonText: {
        color: '#666',
    },
    categoryButtonTextSelected: {
        color: '#FFF',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#129575',
    },
    trendingRecipe: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
    },
    recipeMeal:{
        flexDirection: 'row',
        
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 16,
    },
    recipeInfo: {
        flex: 1,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    recipeDescription: {
        color: 'gray',
        marginBottom: 4,
    },
    recipeMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    recipeTime: {
        color: 'gray',
    },
    recipeRating: {
        color: '#FFD700',
    },
    recipeCard: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginVertical: 8,
    },
    yourRecipes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    yourRecipeCard: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    yourRecipeImage: {
        width: '100%',
        height: 80,
        borderRadius: 10,
        marginBottom: 8,
    },
    yourRecipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    yourRecipeTime: {
        color: 'gray',
    },
});
