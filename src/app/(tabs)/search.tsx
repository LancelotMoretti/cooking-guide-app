import React, { useState } from 'react';
import { View, Text, Switch, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextBox } from '@/components/UI/textBox/TextBox';
import { ButtonIonicons } from '@/components/UI/button/ButtonIonicons';
import { SearchSuggestion, saveSearchQuery, getRecentSearches }  from '@/components/services/searchService';
import { searchRecipes } from '@/components/services/recipeService';
import { Recipe} from '../../components/models/Recipe';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useNavigation } from 'expo-router';


const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchSuggestion[]>([]);
  const [showRecentSearch, setShowRecentSearch] = useState(true);

  getRecentSearches('1').then((searches) => {
    setRecentSearches(searches);
  });

  const handleSearchModal = () => {
    const query = searchQuery || '';

    searchRecipes(query).then((recipes) => {
      setRecipes(recipes);
    });
    saveSearchQuery('1', query);
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      handleSearchModal();
      Keyboard.dismiss(); // Dismiss the keyboard after searching
    }
  };

  const handleRecentSearchToggle = () => {
    setShowRecentSearch((prev) => !prev);
  };

  const handleRecentSearchItemPress = (query: string) => {
    setSearchQuery(query);
    handleSearchModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextBox
            placeholder="Search recipe"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onKeyPress={handleKeyPress}
            placeholderTextColor="#9EA0A4"
          />
        </View>

        <ButtonIonicons
          style={styles.searchButton}
          outerStyle={styles.searchButtonContainer}
          iconName="search"
          onPress={handleSearchModal}
        />
      </View>

      <View style={styles.recentSearchContainer}>
        <Text style={styles.sectionTitle}>Recent Search</Text>
        <Switch
          value={showRecentSearch}
          onValueChange={handleRecentSearchToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={showRecentSearch ? '#129575' : '#f4f3f4'}
        />
      </View>

      {showRecentSearch && (
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentSearchItem}
              onPress={() => handleRecentSearchItemPress(item.query)}
            >
              <Ionicons name="time" size={24} color="#333" style={styles.recentSearchIcon} />
              <Text style={styles.recentSearchText}>{item.query}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.recentSearchList}
        />
      )}

      <Text style={styles.searchResultTitle}>Search Result</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.recipeID}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.recipeCard}
            onPress={() => navigateToStack(navigation, 'recipe-detail')()}
          >
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{item.title || 'Unknown Title'}</Text>
              <Text style={styles.recipeChef}>By {item.userID || 'Unknown User'}</Text>
            </View>
            <View style={styles.recipeRatingContainer}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.recipeRating}>{item.rating || 0}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2} // Hiển thị 2 cột
        contentContainerStyle={styles.recipeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
    marginTop: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 7,
    padding: 8,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 8,
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#AEECE4',
    borderRadius: 20,
  },
  searchButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentSearchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchResultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeList: {
    justifyContent: 'space-between',
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    width: '48%', // Để có khoảng cách giữa các cột
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  recipeInfo: {
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#129575',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  recipeChef: {
    fontSize: 12,
    color: '#129575',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  recipeRatingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
  },
  recentSearchList: {
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  recentSearchIcon: {
    marginRight: 8,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SearchScreen;
