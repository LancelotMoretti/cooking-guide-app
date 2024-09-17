import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Recipe } from '@/components/models/Recipe';
import { getRecipes } from '@/components/services/recipeService';
import { RecipeFavoriteController } from '@/components/controllers/RecipeFavoriteController';
import { readUserIDAndUsername } from '@/components/services/profileService';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue, get } from 'firebase/database';
import { db } from '@/firebaseConfig';


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
    const { userID, username } = readUserIDAndUsername() || { userID: null, username: '' };
    //console.log(userID);
    const defaultUserID = userID || '';
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
    // Fetch recipes and categorize them on component mount
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await getRecipes();
                setRecipes(fetchedRecipes); // Đảm bảo recipes được set trước
    
                const categorizedRecipes = filterRecipesByMeal(fetchedRecipes);
                setFilteredRecipes(categorizedRecipes);
    
                const favoriteRecipeIds = await RecipeFavoriteController.getFavorites(userID || '');
                const favoriteRecipes = fetchedRecipes.filter(recipe => 
                    favoriteRecipeIds.some(fav => fav === recipe.recipeID)
                );
                setFavoriteRecipes(favoriteRecipes); // Set favoriteRecipes sau khi set recipes
            }
            catch (error) {
                console.log(error);
            }
        };
    
        fetchRecipes();  // Gọi fetchRecipes và đảm bảo fetch xong trước khi gọi Firebase
    
        // Theo dõi Firebase favorites sau khi recipes đã được fetch
        const favoriteRef = ref(db, `users/${userID}/favorites`);
        const unsubscribe = onValue(favoriteRef, async (snapshot) => {
            const recipeFavorites = snapshot.exists() ? Object.keys(snapshot.val()) : [];
            const favoriteRecipesFromFirebase = recipes.filter(recipe => 
                recipeFavorites.includes(recipe.recipeID)
            );
            setFavoriteRecipes(favoriteRecipesFromFirebase);  // Cập nhật danh sách favorite dựa trên Firebase
        });
    
        return () => unsubscribe();  // Hủy đăng ký khi component bị unmount
    
    }, [userID, recipes]);  // Thêm recipes làm dependency để đảm bảo Firebase đọc sau khi recipes có dữ liệu
    

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
            <ScrollView style={{ height: 300 }} contentContainerStyle={{ flexGrow: 1 }}  // Đảm bảo nội dung cuộn được
                showsVerticalScrollIndicator={false}>
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
            </ScrollView>
    

            <View style={styles.cardSection}>
                <Text style={styles.sectionTitle}>Favorite Recipes</Text>
                <ScrollView style={{ flexDirection: 'row'}}  horizontal showsHorizontalScrollIndicator={false}>
                {favoriteRecipes.map((recipe) => (
                    <View style={styles.card}>
                    <TouchableOpacity key={recipe.recipeID} style={styles.recipeCard} onPress={() => navigateToStack(navigation, 'recipe-detail', recipe.recipeID)()}>
                            <ImageBackground source={{ uri: recipe.video }} style={styles.image} imageStyle={{ borderRadius: 10 }} />
                            <View style={styles.cardInfo}>
                                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                                <View style={styles.footer}>
                                    
                                    <View style={styles.timeContainer}>
                                        <Ionicons name="time" size={16} color="green" />
                                        <Text>{recipe.duration?.hour}h {recipe.duration?.minute}m</Text>
                                    </View>
                                    <View style={styles.ratingContainer}>
                                        <Ionicons name="star" size={16} color="green" />
                                        <Text style={styles.rating}>{recipe.rating}</Text>
                                    </View>
                                </View>
                            </View>
                        
                    </TouchableOpacity>
                    </View>
                ))}
                </ScrollView>
                
            </View>
            <View style={{marginBottom: 100}}></View>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEF7FF',
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

    cardSection: {
        marginTop: 20,
        backgroundColor: '#129575',
        height: 400,
        borderRadius: 20,
    },

    section: {
        marginHorizontal: 16,
        borderRadius: 20,
        height: 250,
        backgroundColor: '#129575',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#FFFFFF',
        padding: 16,
    },   

    card: {
        borderRadius: 10,
        marginHorizontal: 16,
        //height: 230,
        width: 200,
        overflow: 'hidden',
        
        position: 'relative',
        flexDirection: 'row',
      },
      image: {
        width: 150,
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      cardInfo: {
        padding: 10,
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      rating: {
        marginLeft: 4,
        color: 'green',
      },
      timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      time: {
        marginLeft: 4,
        color: 'green',
      },

});
