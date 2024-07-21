import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextBox from '@/components/search/TextBoxSearch';
import ButtonSearch from '@/components/search/ButtonSearch';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false);

  const recentSearches = [
    { id: '1', title: 'Traditional spare ribs baked', chef: 'Chef John', rating: 4.8},
    { id: '2', title: 'Lamb chops with fruity couscous and mint', chef: 'Spicy Kelly', rating: 4.9},
    { id: '3', title: 'Spice roasted chicken with flavored rice', chef: 'Mark Smith', rating: 4.7},
    { id: '4', title: 'Chinese style Egg fried rice with sliced pork', chef: 'Yumei Chen', rating: 4.6},
    // Add more recipes as needed
  ];

  const handleSearchModal = () => {
    setSearch(true);
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search recipes</Text>
      </View>

      <View style={styles.searchBarContainer}>
        <TextBox
          placeholder="Search recipe"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ButtonSearch onPress={handleSearchModal} />
        
      </View>

      <Text style={styles.sectionTitle}>Recent Search</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#129575',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    padding: 8,
    backgroundColor: '#E3F6F5',
    borderRadius: 10,
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#00b894',
    borderRadius: 10,
  },
  filterButtonText: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeList: {
    alignItems: 'center',
  },
  recipeCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    margin: 8,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  recipeInfo: {
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  recipeChef: {
    color: 'gray',
    marginBottom: 4,
  },
  recipeRating: {
    color: '#FFD700',
  },
});

export default SearchScreen;
