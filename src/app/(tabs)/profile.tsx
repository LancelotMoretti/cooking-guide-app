import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { readProfileInformation } from '@/temp/accountServices';
import { useNavigation } from 'expo-router';
import { ButtonIonicons } from '@/components/UI/button/ButtonIonicons';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useState } from 'react';


export default function ProfileScreen() {
    const navigator = useNavigation();
    const profile = readProfileInformation();
    const bio = 'Passionate about food and life 🍲🍵🍰🚋';
    const numberOfRecipe = 4;
    const numberOfFollowers = 2500000;
    const numberOfFollowing = 259;

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                onPress={() => setSelectedTab('Recipe')}
                >
                    <Text style={selectedTab === 'Recipe' ? styles.tabTextActive : styles.tabText}>Recipe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={selectedTab === 'Favorites' ? styles.tabActive : styles.tab}
                onPress={() => setSelectedTab('Favorites')}
                >
                    <Text style={selectedTab === 'Favorites' ? styles.tabTextActive : styles.tabText}>Favorites</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
});