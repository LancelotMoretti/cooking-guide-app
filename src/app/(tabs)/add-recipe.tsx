import { ScrollView, View, Text, TextInput, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { AddRecipeHeader } from '@/styles/Header';
import { ButtonPublish_First, ButtonPublish, ButtonAdd, ButtonAddVideo} from '@/components/UI/button/Button';
import { ButtonImage } from '@/components/UI/button/ButtonImg';
import { TextBox, TextBoxAmt, TextBoxIngredient, TextBoxInstruction } from '@/components/UI/textBox/TextBox';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { remove } from 'firebase/database';
import { saveNewRecipe, saveUpdatedRecipe } from '@/temp/recipeServices';
import { writeNotification } from '@/temp/notificationServices';
import { ButtonTrashStyles } from '@/styles/AddRecipe';
import { ButtonAddVideoStyles } from '@/styles/AddRecipe';

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
                <ButtonPublish_First title="Publish" onPress={() => setModalVisible(true)} />
                <ButtonPublish_First title="Delete" onPress={handleDelete} />
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
                            <ButtonPublish title="Cancel" onPress={handleCloseModal} />
                            <ButtonPublish title="Publish" onPress={() => {
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
                            <ButtonPublish title="Cancel" onPress={handleCancelDelete} />
                            <ButtonPublish title="Delete" onPress={handleConfirmDelete} />
                        </View>
                    </View>
                </View>
            </Modal>

            <ImageBackground
                source={video ? { uri: video } : require('../../assets/images/addRecipe/Food.png')}
                style={styles.videoContainer}
                imageStyle={{ borderRadius: 10 }}
            >
                
                <ButtonImage 
                            style={ButtonTrashStyles.container} 
                            source={require('../../assets/images/addRecipe/video-bot.png')} 
                            onPress={handleAddVideo} 
                        />
                
            </ImageBackground>

            <Text style={styles.title}>Title</Text>
            <TextBox 
                placeholder="Recipe title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9EA0A4"
            />

            <Text style={styles.title}>Description</Text>
            <TextBox 
                placeholder="Recipe description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#9EA0A4"
            />

            <Text style={styles.title}>Time Recipe</Text>
            <TextBox 
                placeholder="1hour, 30min,..."
                value={timeRecipe}
                onChangeText={setTimeRecipe}
                placeholderTextColor="#9EA0A4"
            />
        
            <Text style={styles.title}>Ingredients</Text>

            <View style={styles.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <TextBoxAmt 
                            placeholder={`Amt `}
                            value={ingredient.amount}
                            onChangeText={(value: string) => handleAmountChange(index, value)}
                            placeholderTextColor="#9EA0A4"
                            //onIconPress={() => {}}
                        />
                        <TextBoxIngredient
                            placeholder={`Ingredient ${index + 1}                `}
                            value={ingredient.description}
                            onChangeText={(value: string) => handleDescriptionChange(index, value)}
                            placeholderTextColor="#9EA0A4"
                        />
                        <ButtonImage 
                            outerStyle={ButtonTrashStyles.button}
                            style={ButtonTrashStyles.container} 
                            source={require('../../assets/images/Trash.png')} 
                            onPress={() => handleremoveIngredient(index)} 
                        />
                          
                        
                    </View>
                ))}
            </View>

            <ButtonAdd title="+ Add Ingredient" onPress={handleAddIngredient} />
            
            <Text style={styles.title}>Instructions</Text>
            <View>
            <View style={styles.ingredientsList}>
              {instructions.map((instruction, index) => (
                    <View key={index} style={styles.instruction}>
                        <TextBoxInstruction
                            placeholder={`Instruction ${index + 1}                                  `}
                            value={instruction}
                            onChangeText={(text: string) => handleInstructionChange(text, index)}
                            placeholderTextColor="#9EA0A4"
                        />

                        <ButtonImage 
                            outerStyle={ButtonTrashStyles.button}
                            style={ButtonTrashStyles.container} 
                            source={require('../../assets/images/Trash.png')} 
                            onPress={() => handleDeleteInstruction(index)} />


                    </View>
                ))}
            </View>
            </View>
        
            <ButtonAdd title="+ Add Instruction" onPress={handleAddInstruction} />

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