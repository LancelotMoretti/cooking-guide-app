import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { User } from '../components/models/User'; 
import { getRecipes, setStatusRecipe } from '../components/services/recipeService';
import { NotificationScreenStyles } from '@/styles/Notification';   
import { Recipe } from '../components/models/Recipe'; 


const ModeratorScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMode, setSearchMode] = useState<'recipes' | 'accounts'>('recipes');
  
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [users, setUsers] = useState<User[]>([
      new User('user1', 'User 1', 'user1@example.com', 'password1', 'User', false, 'Free', [], [], [], [], []),
      new User('user2', 'User 2', 'user2@example.com', 'password2', 'User', false, 'Premium', [], [], [], [], []),
      new User('user3', 'User 3', 'user3@example.com', 'password3', 'Moderator', false, 'Free', [], [], [], [], []),
    ]);

    const banUser = (userID: string) => {
      const updatedUsers = users.map(user =>
        user.accountID === userID ? 
          new User(
            user.accountID,
            user.username,
            user.email,
            user.password,
            user.type,
            true,
            user.userType,
            user.recipesID,
            user.savedRecipesID,
            user.notifications,
            user.followers,
            user.following
          ) : user
      );
      setUsers(updatedUsers);
    };
    
    const unbanUser = (userID: string) => {
      const updatedUsers = users.map(user =>
        user.accountID === userID ? 
          new User(
            user.accountID,
            user.username,
            user.email,
            user.password,
            user.type,
            false,
            user.userType,
            user.recipesID,
            user.savedRecipesID,
            user.notifications,
            user.followers,
            user.following,
          ) : user
      );
      setUsers(updatedUsers);
    };
    
  
    useEffect(() => {
      const fetchRecipes = async () => {
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
      };

      fetchRecipes();
    }, []);
  
    const getFilteredRecipes = () => {
      return recipes.filter(recipe =>
        (recipe.title?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
        (recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
      );
    };
    
    const getFilteredUsers = () => {
      return users.filter(user =>
        (user.username?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
      );
    };

    const handleStatusChange = (recipeID: string, newStatus: string) => {
      setStatusRecipe(recipeID, newStatus); // Cập nhật trạng thái trên server hoặc database
      const updatedRecipes = recipes.map(recipe => 
        recipe.recipeID === recipeID ? { ...recipe, status: newStatus } : recipe
      ) as Recipe[];
      setRecipes(updatedRecipes);
    };
  
    return (
      <View style={NotificationScreenStyles.container}>
        <Text style={styles.title}>Moderator Dashboard</Text>
  
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${searchMode === 'recipes' ? 'recipes' : 'users'}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
  
        <View style={NotificationScreenStyles.filterContainer}>
          <TouchableOpacity
            style={[
              NotificationScreenStyles.filterButton,
              searchMode === 'recipes' && NotificationScreenStyles.activeFilter,
            ]}
            onPress={() => setSearchMode('recipes')}
          >
            <Text
              style={[
                NotificationScreenStyles.buttonText,
                searchMode === 'recipes' && NotificationScreenStyles.buttonTextActive,
              ]}
            >
              Search Recipes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              NotificationScreenStyles.filterButton,
              searchMode === 'accounts' && NotificationScreenStyles.activeFilter,
            ]}
            onPress={() => setSearchMode('accounts')}
          >
            <Text
              style={[
                NotificationScreenStyles.buttonText,
                searchMode === 'accounts' && NotificationScreenStyles.buttonTextActive,
              ]}
            >
              Search Users
            </Text>
          </TouchableOpacity>
        </View>
  
        {searchMode === 'recipes' ? (
          <FlatList
            data={getFilteredRecipes()}
            keyExtractor={(item) => item.recipeID}
            renderItem={({ item }) => (
              <View style={styles.recipeItem}>
                <View style={styles.recipeDetails}>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                  <Text style={styles.recipeDescription}>{item.description}</Text>
                </View>
                <View style={styles.statusButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      item.status === 'Pending' && styles.statusButtonPending,
                    ]}
                    onPress={() => handleStatusChange(item.recipeID, 'Pending')}
                  >
                    <Text style={styles.statusButtonText}>Pending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      item.status === 'Approved' && styles.statusButtonApproved,
                    ]}
                    onPress={() => handleStatusChange(item.recipeID, 'Approved')}
                  >
                    <Text style={styles.statusButtonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      item.status === 'Declined' && styles.statusButtonDeclined,
                    ]}
                    onPress={() => handleStatusChange(item.recipeID, 'Declined')}
                  >
                    <Text style={styles.statusButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <FlatList
            data={getFilteredUsers()}
            keyExtractor={(item) => item.accountID}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{item.username}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                {item.banned ? (
                  <TouchableOpacity
                    style={styles.unbanButton}
                    onPress={() => unbanUser(item.accountID)}
                  >
                    <Text style={styles.unbanButtonText}>Unban</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.banButton}
                    onPress={() => banUser(item.accountID)}
                  >
                    <Text style={styles.banButtonText}>Ban</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        )}
      </View>
    );
};

const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    recipeItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginBottom: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    recipeDetails: {
      flex: 1,
    },
    recipeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    recipeDescription: {
      fontSize: 14,
      color: '#666',
    },
    statusButtonsContainer: {
      flexDirection: 'row',
      marginLeft: 10,
    },
    statusButton: {
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      backgroundColor: '#ddd',
    },
    statusButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    statusButtonPending: {
      backgroundColor: '#FFD700',
    },
    statusButtonApproved: {
      backgroundColor: '#4CAF50',
    },
    statusButtonDeclined: {
      backgroundColor: '#FF5733',
    },
    userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginBottom: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    userEmail: {
      fontSize: 14,
      color: '#666',
    },
    banButton: {
      padding: 10,
      backgroundColor: '#FF5733',
      borderRadius: 8,
      marginLeft: 10,
    },
    banButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    unbanButton: {
      padding: 10,
      backgroundColor: '#4CAF50',
      borderRadius: 8,
      marginLeft: 10,
    },
    unbanButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
});
  
export default ModeratorScreen;
