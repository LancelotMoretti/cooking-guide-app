import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Help() {
    const [selectedTab, setSelectedTab] = useState('General');

    const generalData = [
        {
            id: '1',
            question: 'How to post a recipe?',
            answer: (
                <Text>
                    1. Click icon <Ionicons name="add" size={20} color="black" /> {"\n"}
                    2. Assign information about the recipe {"\n"}
                    3. Click "Publish" to publish the recipe or "Delete" to delete the recipe
                </Text>
            ),
        },
        {
            id: '2',
            question: 'How to search a recipe?',
            answer: (
                <Text>
                    1. Click icon <Ionicons name="search" size={20} color="black" /> {"\n"}
                    2. Enter the name of the dish for the recipe in the search bar {"\n"}
                    3. Click the icon <Ionicons name="search" size={20} color="black" /> next to the search bar
                </Text>
            ),
        },
        // Add more questions and answers here
    ];

    const contactData = [
        { id: '1', name: 'dtkha22@clc.fitus.edu.vn' },
        { id: '2', name: 'nhntran22@clc.fitus.edu.vn' },
        { id: '3', name: 'btphat22@clc.fitus.edu.vn' },
        { id: '4', name: 'dvhoang22@clc.fitus.edu.vn' },
        { id: '5', name: 'nnatu22@clc.fitus.edu.vn' },
    ];

    const renderGeneralItem = ({ item }: { item: any }) => (
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <Text style={styles.answerText}>{item.answer}</Text>
        </View>
    );

    const renderContactItem = ({ item }: { item: any }) => (
        <View style={styles.contactContainer}>
            <Image source={item.icon} style={styles.contactIcon} />
            <Text style={styles.contactText}>{item.name}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Help Center</Text>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'General' && styles.activeTab]}
                    onPress={() => setSelectedTab('General')}
                >
                    <Text style={[styles.tabText, selectedTab === 'General' && styles.activeTabText]}>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Contact Us' && styles.activeTab]}
                    onPress={() => setSelectedTab('Contact Us')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Contact Us' && styles.activeTabText]}>Contact Us</Text>
                </TouchableOpacity>
            </View>

            {selectedTab === 'General' && (
                <View>
                    <FlatList
                        data={generalData}
                        renderItem={renderGeneralItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            )}

            {selectedTab === 'Contact Us' && (
                <View>
                    <FlatList
                        data={contactData}
                        renderItem={renderContactItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#129575',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
    },
    tab: {
        padding: 10,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#129575',
    },
    tabText: {
        fontSize: 16,
        color: '#000',
    },
    activeTabText: {
        color: '#FFF',
    },
    questionContainer: {
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    answerText: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    contactIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
    },
    contactText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
    },
});
