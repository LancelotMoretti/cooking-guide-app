import { ScrollView, View, Text, TextInput, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { AddRecipeHeader } from '@/constants/Header';
import Button from '@/components/addRecipe/Button';
import ButtonPublish from '@/components/addRecipe/ButtonPublish';
import ButtonAddVideo from '@/components/addRecipe/ButtonAddVideo';
import ButtonAdd from '@/components/addRecipe/ButtonAdd';
import ButtonTrash from '@/components/addRecipe/ButtonTrash';
import Box from '@/components/addRecipe/TextBox';
import BoxAmt from '@/components/addRecipe/TextBoxAmt';
import BoxIngredient from '@/components/addRecipe/TextBoxIngredient';
import BoxInstruction from '@/components/addRecipe/TextBoxInstruction';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/services/navigateServices';
import { remove } from 'firebase/database';
import { saveNewRecipe, saveUpdatedRecipe } from '@/services/recipeServices';
import { writeNotification } from '@/services/notificationServices';




export default function AddRecipe() {
    const navigation = useNavigation();
    
    const [video, setVideo] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeRecipe, setTimeRecipe] = useState('');
    const [ingredients, setIngredients] = useState([{ amount: '', description: '' }]);

    const [instructions, setInstructions] = useState(['']);

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handlePublish = () => {
        saveNewRecipe(
            {
                recipeID: '0',
                userID: '0'.toString(),
                title: title,
                description: description,
                timeDuration: timeRecipe,
                ingredients: ingredients,
                instructions: instructions,
                video: "",
                time: new Date(),
                status: "Pending"
            }
        );
        setModalVisible(false);
        console.log('Recipe published');
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        setDeleteModalVisible(false);
        console.log('Recipe deleted');
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const handleAddVideo = () => {
        // Xử lý thêm video ở đây
        
      };
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { amount: '', description: '' }]);
    };
    
    const handleAmountChange = (index: any, value: any) => {
        const newIngredients = [...ingredients];
        newIngredients[index].amount = value;
        setIngredients(newIngredients);
    };
    
    const handleDescriptionChange = (index: any, value: any) => {
        const newIngredients = [...ingredients];
        newIngredients[index].description = value;
        setIngredients(newIngredients);
    };

    const handleremoveIngredient = (index: any) => {
        const newIngredients = ingredients.slice();
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };
    
    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleInstructionChange = (text: any, index: any) => {
        const newInstructions = instructions.slice();
        newInstructions[index] = text;
        setInstructions(newInstructions);
    };

    const handleDeleteInstruction = (index: any) => {
        const newInstructions = instructions.slice();
        newInstructions.splice(index, 1);
        setInstructions(newInstructions);
    };

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >    
        <ScrollView style={styles.container}>
            <Text style={AddRecipeHeader}>Create Recipe</Text>
            <View style={styles.button}>
                <Button buttonText="Publish" onPress={() => setModalVisible(true)} />
                <Button buttonText="Delete" onPress={handleDelete} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Publish Recipe</Text>
                        <Text>Are you sure you want to publish the recipe?</Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonPublish buttonText="Cancel" onPress={handleCloseModal} />
                            <ButtonPublish buttonText="Publish" onPress={() => {
                                handlePublish();
                                saveNewRecipe({
                                    recipeID: '0', 
                                    userID: '0',
                                    title: title,
                                    description: description,
                                    timeDuration: timeRecipe,
                                    ingredients: ingredients,
                                    instructions: instructions,
                                    video: "",
                                    time: new Date(),
                                    status: "Pending"})
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={handleCancelDelete}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Delete Recipe</Text>
                        <Text>Are you sure you want to delete the recipe?</Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonPublish buttonText="Cancel" onPress={handleCancelDelete} />
                            <ButtonPublish buttonText="Delete" onPress={handleConfirmDelete} />
                        </View>
                    </View>
                </View>
            </Modal>

            <ImageBackground
                source={video ? { uri: video } : require('../../assets/images/addRecipe/Food.png')}
                style={styles.videoContainer}
                imageStyle={{ borderRadius: 10 }}
            >
                <ButtonAddVideo buttonText="Add video recipe" onPress={handleAddVideo} />
                
            </ImageBackground>

            <Text style={styles.title}>Title</Text>
            <Box 
                placeholder="Recipe title"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.title}>Description</Text>
            <Box 
                placeholder="Recipe description"
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.title}>Time Recipe</Text>
            <Box 
                placeholder="1hour, 30min,..."
                value={timeRecipe}
                onChangeText={setTimeRecipe}
            />
        
            <Text style={styles.title}>Ingredients</Text>

            <View style={styles.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <BoxAmt 
                            placeholder={`Amt `}
                            value={ingredient.amount}
                            onChangeText={(value) => handleAmountChange(index, value)}
                            //onIconPress={() => {}}
                        />
                        <BoxIngredient
                            placeholder={`Ingredient ${index + 1}`}
                            value={ingredient.description}
                            onChangeText={(value) => handleDescriptionChange(index, value)}
                        />
                        <ButtonTrash onPress={handleremoveIngredient} />
                          
                        
                    </View>
                ))}
            </View>

            <ButtonAdd buttonText="+ Add Ingredient" onPress={handleAddIngredient} />
            
            <Text style={styles.title}>Instructions</Text>
            <View>
            <View style={styles.ingredientsList}>
              {instructions.map((instruction, index) => (
                    <View key={index} style={styles.instruction}>
                        <BoxInstruction
                            placeholder={`Instruction ${index + 1}                                  `}
                            value={instruction}
                            onChangeText={(text) => handleInstructionChange(text, index)}
                            
                        />

                        <ButtonTrash onPress={handleDeleteInstruction} />

                    </View>
                ))}
            </View>
            </View>
        
            <ButtonAdd buttonText="+ Add Instruction" onPress={handleAddInstruction} />

        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        
        marginHorizontal: 30,
      },
    button: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
    },
    modalTitle: {
    
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#129575',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: '#a5e7dc',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: '#129575',
        fontSize: 16,
    },
    videoContainer: {
        marginBottom: 20,
    },

    addVideoButton: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
      },
      addVideoText: {
        color: 'white',
        fontSize: 16,
      },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
    trashIcon: {
        width: 24,
        height: 24,
    },
    
    ingredientsList: {
        marginBottom: 20,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },

    instructionsList: {
        marginBottom: 20,
    },
    instruction: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
    },
    
});