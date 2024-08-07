import { View, Text, Button, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ButtonMeal } from '@/components/UI/button/Button';

const recipes: { [key: string]: { id: string; title: string; image: string; time: string; rating: number; }[] } = {
  Breakfast: [
    { id: '1', title: 'Salami and cheese pizza', image: 'image1.png', time: '30min', rating: 5 },
    { id: '2', title: 'Chicken Burger', image: 'image2.png', time: '15min', rating: 5 },
  ],
  Lunch: [
    { id: '3', title: 'Tiramisu', image: 'image3.png', time: '15min', rating: 5 },
    // Thêm các món ăn khác
  ],
  // Thêm các danh mục khác
};

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('Breakfast');

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hi!</Text>
                <Text style={styles.subGreeting}>What are you cooking today</Text>
            </View>

            <View style={styles.categoryContainer}>
                {['Breakfast', 'Lunch', 'Dinner', 'Vegan'].map((category) => (
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
      <FlatList data={recipes[selectedCategory]}
                renderItem={({ item }) => (
                <View style={styles.recipeCard}>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                  <Text>{item.time}</Text>
                  <Text>{item.rating} ⭐</Text>
              </View>
              )}
                  keyExtractor={(item) => item.id}
              />
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