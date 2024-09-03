import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRecipe, pushComment, getComments, deleteComment } from '@/components/services/recipeService';
import { Recipe } from '@/components/models/Recipe';
import { ImageBackground } from 'react-native';
import { UserComment } from '@/components/models/UserComment';
import { UserProfileLink } from '@/components/models/UserProfileLink';
import { readUserIDAndUsername } from '@/components/services/profileService';
import { User } from '@/components/models/User';
import { set } from 'firebase/database';

export default function RecipeDetail() {
    const { userID, username } = readUserIDAndUsername() || { userID: '', username: '' };
    const navigation = useNavigation();
    const route = useRoute();
    const recipeID = (route.params as { header: string })?.header;

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState<UserComment[]>([]);
    const [editingCommentID, setEditingCommentID] = useState<string | null>(null);
    const [editComment, setEditComment] = useState<UserComment | null>(null);

    getComments(recipeID || '').then((comments) => {
        setComments(comments);
    });

    useEffect(() => {
        if (recipeID) { 
            const fetchRecipe = async () => {
                try {
                    setLoading(true);
                    const fetchedRecipe = await getRecipe(recipeID);
                    setRecipe(fetchedRecipe);
                    setComments(fetchedRecipe.comments || []);
                } catch (error) {
                    console.error("Error fetching recipe:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRecipe();
        }
    }, [recipeID]);

    const handleAddComment = (content?: string) => {
        if (content === undefined) {
            content = commentContent;
        }
        if (content.trim()) {
            const userLink = new UserProfileLink(userID || '', username || '');
            const newComment = new UserComment(
                userLink,
                new Date().toISOString(),
                content
            );

            pushComment(recipeID || '', newComment);
            setComments((prevComments) => [...prevComments, newComment]);
            setCommentContent('');
        }
    };

    const handleEditComment = (commentID: string) => {
        setEditingCommentID(commentID);
        const commentToEdit = comments.find(comment => comment.user.accountID === userID && comment.user.accountID === commentID);
        setEditComment(commentToEdit || null);
    };

    const handleRemoveComment = (comment: UserComment) => {
        deleteComment(recipeID || '', comment.user.accountID, comment.date);
        setComments((prevComments) =>
            prevComments.filter((prevComment) => prevComment !== comment)
        );
    };
    
    const handleUpdateComment = (comment: UserComment) => {
        handleRemoveComment(comment);
        handleAddComment(comment.content);
        setEditingCommentID(null);
    }

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (!recipe) {
        return <Text>No recipe found.</Text>;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView style={styles.container}>
                <View style={styles.image}>
                    <ImageBackground
                        source={{ uri: recipe.video }}
                        style={styles.backgroundVideo}
                        imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
                    />
                </View>

                <Text style={styles.title}>{recipe.title}</Text>

                <Text style={styles.sectionTitle}>Details</Text>
                <Text>{recipe.description}</Text>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                    {recipe.ingredients?.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientRow}>
                            <Text style={styles.ingredientDescription}>{ingredient.name}</Text>
                            <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Instructions</Text>
                <View style={styles.instructionsList}>
                    {recipe.steps?.map((instruction, index) => (
                        <View key={index} style={styles.instruction}>
                            <Text style={styles.instructionStep}>Step {index + 1}</Text>
                            <Text>{instruction}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Comments</Text>
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <View key={index} style={styles.commentContainer}>
                            <TouchableOpacity onPress={comment.clickUserProfile}>
                                <Text style={styles.commentUser}>{comment.user?.username || 'Unknown User'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.commentDate}>{comment.date || 'Unknown Date'}</Text>
                            <Text style={styles.commentContent}>{comment.content || 'No content available'}</Text>
                            
                            {comment.user.accountID === userID && (
                                <View style={styles.commentActions}>
                                    <TouchableOpacity onPress={() => handleEditComment(comment.user.accountID)}>
                                        <Text style={styles.commentActionText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleRemoveComment(comment)}>
                                        <Text style={styles.commentActionText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))
                ) : (
                    <Text>No comments yet.</Text>
                )}

                <View style={styles.addCommentContainer}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        value={commentContent}
                        onChangeText={setCommentContent}
                    />
                    <TouchableOpacity onPress={() => handleAddComment()} style={styles.addCommentButton}>
                        <Text style={styles.addCommentButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>

                {editingCommentID && (
                    <View style={styles.editCommentContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Edit your comment..."
                            value={editComment?.content}
                            onChangeText={(newContent) => setEditComment(new UserComment(editComment?.user || new UserProfileLink('', ''), editComment?.date || '', newContent))}
                        />
                        <TouchableOpacity onPress={() => handleUpdateComment(editComment as UserComment)} style={styles.addCommentButton}>
                            <Text style={styles.addCommentButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        paddingBottom: 50,
    },
    image: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#129575',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#129575',
    },
    ingredientsList: {
        marginBottom: 20,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
    },
    ingredientDescription: {
        fontSize: 16,
    },
    ingredientAmount: {
        color: 'gray',
    },
    instructionsList: {
        marginBottom: 20,
    },
    instruction: {
        marginBottom: 5,
        backgroundColor: '#9FEADF',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    instructionStep: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    backgroundVideo: {
        width: '100%',
        height: 300, 
    },
    commentContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
    },
    commentUser: {
        fontWeight: 'bold',
        color: '#129575',
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 5,
    },
    commentContent: {
        fontSize: 14,
        color: '#333',
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    commentActionText: {
        marginLeft: 10,
        color: '#129575',
        fontWeight: 'bold',
    },
    addCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    commentInput: {
        flex: 1,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#FFF',
    },
    addCommentButton: {
        backgroundColor: '#129575',
        padding: 10,
        borderRadius: 10,
    },
    addCommentButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    editCommentContainer: {
        marginTop: 20,
    },
});
