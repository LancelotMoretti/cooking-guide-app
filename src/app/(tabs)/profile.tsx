import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { readProfileInformation } from '@/components/services/profileService';
import { useNavigation } from 'expo-router';
import { ButtonIonicons } from '@/components/UI/button/ButtonIonicons';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useState } from 'react';
import { getRecipes } from '@/components/services/recipeService';
import { Recipe } from '@/components/models/Recipe';
import { useEffect } from 'react';
import { auth } from '@/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebaseConfig';
import { RecipeFavoriteController } from '@/components/controllers/RecipeFavoriteController';


export default function ProfileScreen() {
    const navigator = useNavigation();
    const profile = readProfileInformation();
    const bio = 'Bio here';

    const formatNumber = (num: number) => {
        if (num > 999 && num < 1000000) {
            return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
        } else if (num > 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
        } else if (num < 900) {
            return num; // if value < 1000, nothing to do
        }
    }

    const [selectedTab, setSelectedTab] = useState('Recipe');

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<Recipe[]>([]);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                // Lấy tất cả các công thức
                const fetchedRecipes = await getRecipes();
                setRecipes(fetchedRecipes);

                // Lấy các công thức yêu thích ban đầu
                const recipeFavorites = await RecipeFavoriteController.getFavorites(profile?.userID || '');
                const favoriteRecipes = fetchedRecipes.filter(recipe => 
                    recipeFavorites.some(fav => fav === recipe.recipeID)
                );
                setFavorites(favoriteRecipes);
            } catch (error) {
                console.error("Error fetching recipes or favorites:", error);
            }
        };

        // Lắng nghe sự thay đổi của dữ liệu favorites trên Firebase
        const favoriteRef = ref(db, `users/${profile?.userID}/favorites`);
        const unsubscribe = onValue(favoriteRef, async (snapshot) => {
            const recipeFavorites = snapshot.exists() ? Object.keys(snapshot.val()) : [];
            const favoriteRecipes = recipes.filter(recipe => 
                recipeFavorites.includes(recipe.recipeID)
            );
            setFavorites(favoriteRecipes);
        });

        fetchRecipes();

        // Cleanup listener khi component bị unmount
        return () => unsubscribe();
    }, [profile?.userID, recipes]);



    const currentUser = auth.currentUser;
    let userRecipes = recipes;
    let numberOfRecipe = 0;
    let numberOfFollowers = 0;
    let numberOfFollowing = 0;
    if (currentUser) {
        userRecipes = recipes.filter(recipe => recipe.userID === currentUser.uid);
        numberOfRecipe = userRecipes.length;
    }
    
    const displayRecipeList = () => {
        return (
            <FlatList nestedScrollEnabled
                data={userRecipes}
                keyExtractor={(item) => item.recipeID}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    style={styles.recipe}
                    onPress={navigateToStack(navigator, "recipe-detail", item.recipeID)}
                    >
                        <Image source={{ uri: item.video }} style={styles.recipeImage} />
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                            <View style={styles.recipeMeta}>
                                <Text style={styles.recipeTime}>{item.duration.hour}h {item.duration.minute}m</Text>
                                <Text style={styles.recipeRating}>⭐ {item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                style={styles.recipeList}
            />
        );
    }

    const displayFavoriteList = () => {
        return (
            <FlatList nestedScrollEnabled
                data={favorites}
                keyExtractor={(item) => item.recipeID}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    style={styles.recipe}
                    onPress={navigateToStack(navigator, "recipe-detail", item.recipeID)}
                    >
                        <Image source={{ uri: item.video }} style={styles.recipeImage} />
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                            <View style={styles.recipeMeta}>
                                <Text style={styles.recipeTime}>{item.duration?.hour}h {item.duration?.minute}m</Text>
                                <Text style={styles.recipeRating}>⭐ {item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                style={styles.recipeList}
            />
        );
    }

    return (
        <ScrollView style={styles.container}>
            <ButtonIonicons 
                iconName="settings-outline" 
                onPress={navigateToStack(navigator, "setting")}
            />

            <View style={styles.header}>
                <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.profileImage} 
                />
                <Text style={styles.name}>{profile?.fullName}</Text>
                <Text style={styles.description}>{bio}</Text>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{numberOfRecipe}</Text>
                        <Text style={styles.statLabel}>Recipe</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{formatNumber(numberOfFollowers)}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>{formatNumber(numberOfFollowing)}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity
                style={selectedTab === 'Recipe' ? styles.tabActive : styles.tab}
                onPress={() => {
                    setSelectedTab('Recipe')
                }}
                >
                    <Text style={selectedTab === 'Recipe' ? styles.tabTextActive : styles.tabText}>Recipes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={selectedTab === 'Favorites' ? styles.tabActive : styles.tab}
                onPress={() => {
                    setSelectedTab('Favorites')
                }}
                >
                    <Text style={selectedTab === 'Favorites' ? styles.tabTextActive : styles.tabText}>Favorites</Text>
                </TouchableOpacity>
            </View>
            {selectedTab === 'Recipe' && displayRecipeList()}
            {selectedTab === 'Favorites' && profile?.userID && displayFavoriteList()}
            <View style={{marginBottom: 100}}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    title: {
        fontSize: 18,
        color: 'grey',
    },
    subTitle: {
        fontSize: 16,
        color: 'grey',
    },
    description: {
        fontSize: 14,
        textAlign: 'left',
        marginVertical: 10,
    },
    more: {
        color: 'blue',
        marginVertical: 10,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: 'grey',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 10,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: 'green',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
        color: 'grey',
    },
    tabTextActive: {
        fontSize: 16,
        color: 'green',
    },
    recipe: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    recipeInfo: {
        flex: 1,
        paddingLeft: 10,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    recipeChef: {
        fontSize: 14,
        color: 'grey',
    },
    recipeMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    recipeTime: {
        fontSize: 14,
        color: 'grey',
    },
    recipeRating: {
        fontSize: 14,
        color: 'grey',
    },
    recipeList: {
        marginTop: 20,
      },
});