import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import ButtonMeal from '@/components/home/ButtonMeal';

export default function Home() {


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi!</Text>
                <Text style={styles.subGreeting}>What are you cooking today</Text>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Breakfast</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Lunch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Dinner</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Recipe</Text>
                <View style={styles.trendingRecipe}>
                    <Image style={styles.recipeImage} />
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
                        <Image style={styles.yourRecipeImage} />
                        <Text style={styles.yourRecipeTitle}>Title</Text>
                        <Text style={styles.yourRecipeTime}>Time</Text>
                    </View>
                    <View style={styles.yourRecipeCard}>
                        <Image style={styles.yourRecipeImage} />
                        <Text style={styles.yourRecipeTitle}>Title</Text>
                        <Text style={styles.yourRecipeTime}>Time</Text>
                    </View>
                </View>
            </View>

            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      padding: 16,
    },
    header: {
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

      tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
      },
      tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#E3F6F5',
        borderRadius: 20,
      },
      tabText: {
        color: '#00b894',
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
      topChefs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      chefImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },

      navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      navItem: {
        alignItems: 'center',
      },
});