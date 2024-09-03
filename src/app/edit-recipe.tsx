import { ScrollView, View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground, Alert  } from 'react-native';
import { useEffect, useState } from 'react';
import { AddRecipeHeader } from '@/styles/Header';
import * as ImagePicker from 'expo-image-picker';
import { ButtonFirst, ButtonPublish, ButtonAdd, ButtonAddVideo } from '@/components/UI/button/Button';
import { ButtonImage } from '@/components/UI/button/ButtonImg';
import { TextBox, TextBoxAmt, TextBoxIngredient, TextBoxInstruction, TextBoxTime } from '@/components/UI/textBox/TextBox';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { remove, set } from 'firebase/database';
import { ButtonChooseStyles, ButtonTrashStyles } from '@/styles/AddRecipe';
import { getRecipe } from '@/components/services/recipeService';
import { saveUpdatedRecipe } from '@/temp/recipeServices';
import { Recipe } from '@/temp/recipeServices';
import { useRoute } from '@react-navigation/native';
import { readUserIDAndUsername } from '@/components/services/profileService';
import { ButtonChoose } from '@/components/UI/button/ButtonChoose';

export default function AddRecipe() {
    const navigation = useNavigation();
    const route = useRoute();
    const recipeID = (route.params as { header: string })?.header;
    const { userID, username } = readUserIDAndUsername() || { userID: '', username: '' };

    const [video, setVideo] = useState<any | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeRecipe, setTimeRecipe] =  useState<{hour: number, minute: number}>({ hour: 0, minute: 0 });
    const [tags, setTags] = useState([] as any);
    const [rating, setRating] = useState(0);
    const [ingredients, setIngredients] = useState([{ amount: '', name: '' }]);
    const [meal, setMeal] = useState({ breakfast: false, lunch: false, dinner: false });

    const [instructions, setInstructions] = useState(['']);

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (recipeID) { // Only fetch data if recipeID is defined
            const fetchRecipe = async () => {
                try {
                    setLoading(true);
                    const fetchedRecipe = await getRecipe(recipeID);
                    setTitle(fetchedRecipe.title)
                    setDescription(fetchedRecipe.description)
                    setTimeRecipe(fetchedRecipe.duration)
                    setIngredients(fetchedRecipe.ingredients)
                    setInstructions(fetchedRecipe.steps)
                    setMeal(fetchedRecipe.meal)
                    setVideo(fetchedRecipe.video)
                    setTags(fetchedRecipe.tags)
                    setRating(fetchedRecipe.rating)
                } catch (error) {
                    console.error("Error fetching recipe:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRecipe();
        }
    }, [recipeID]); // Add recipeID as a dependency

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const validateFields = (): boolean => {
        if (title == '' || description == '' || (!timeRecipe.hour && !timeRecipe.minute) || ingredients.length === 0 || instructions.length === 0 || !meal) {
            Alert.alert('Missing Information', 'Please fill in all the fields before publishing.');
            return false;
        }
        return true;
    };
    const handleUpdate = () => {
        if (validateFields()) {
            saveUpdatedRecipe({
                recipeID,
                userID: userID ?? '0',
                title,
                description,
                duration: { hour: timeRecipe.hour, minute: timeRecipe.minute },
                ingredients,
                steps: instructions,
                meal,
                video, 
                tags: tags ?? [],
                rating,
                comments: [],
                date: new Date(), 
                status: 'Pending'
            });
        setModalVisible(false);
        console.log('Recipe published');
        };
    }

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

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { amount: '', name: '' }]);
    };
    const handleAmountChange = (index: any, value: any) => {
        const newIngredients = [...ingredients];
        newIngredients[index].amount = value;
        setIngredients(newIngredients);
    };
    
    const handleDescriptionChange = (index: any, value: any) => {
        const newIngredients = [...ingredients];
        newIngredients[index].name = value;
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

    const handleAddVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // Allows both image and video selection
            allowsEditing: true, // Allows the user to edit the media (crop, etc.)
            aspect: [4, 3], // The aspct ratio the user can crop to
            quality: 1, // The quality of the selected media
        });
        console.log(result);
        if (result.assets && result.assets.length > 0) {
            setVideo(result.assets[0].uri); // Update to handle selected media
        }
    };

    const handleHourChange = (text: string) => {
        const parsed = parseInt(text, 10);
        if (!isNaN(parsed)) {
          setTimeRecipe(prevState => ({ ...prevState, hour: parsed }));
        }
        else if (text === '') { setTimeRecipe(prevState => ({ ...prevState, hour: 0 })); } 
    };

    const handleMinuteChange = (text: string) => { 
        const parsed = parseInt(text, 10); 
        if (!isNaN(parsed)) { setTimeRecipe(prevState => ({ ...prevState, minute: parsed })); } 
        else if (text === '') { setTimeRecipe(prevState => ({ ...prevState, minute: 0 })); } 
    };

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >    
        <ScrollView style={styles.container}>
            <View style={styles.button}>
                <ButtonFirst title="Update" onPress={() => setModalVisible(true)} />
                <ButtonFirst title="Delete" onPress={handleDelete} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Update Recipe</Text>
                        <Text>Are you sure you want to update the recipe?</Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonPublish title="Cancel" onPress={handleCloseModal} />
                            <ButtonPublish title="Update" onPress={() => {handleUpdate()}} />
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

            <View style = {styles.backgroundVideo}>
                <ImageBackground
                    source={video ? { uri: video } : require('../assets/images/addRecipe/Food.png')}
                    style={styles.videoContainer}
                    imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
                >
                </ImageBackground>  
                <ButtonAdd 
                    //style={styles.centerButtonContainer} 
                    //containerStyle={styles.centerButtonContainer}
                    title="Change Image"
                    onPress={handleAddVideo} 
                    />  
            </View>

            <Text style={styles.title}>Title</Text>
            <TextBox 
                placeholder="Recipe title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#9EA0A4"
            />

            <Text style={styles.title}>Desription</Text>
            <TextBox 
                placeholder="Recipe description"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor="#9EA0A4"
            />

            <View style={styles.ingredientRow}>
                <Text>Hours: </Text>
                <TextBoxTime
                    //style={styles.textBox}
                    placeholder="Hour"
                    value={timeRecipe.hour.toString()}
                    onChangeText={handleHourChange}
                    keyboardType="numeric"
                    placeholderTextColor="#9EA0A4"
                />
                <Text>Minutes: </Text>
                <TextBoxTime
                    placeholder="Miniute"
                    value={timeRecipe.minute.toString()}
                    onChangeText={handleMinuteChange}
                    keyboardType="numeric"
                    placeholderTextColor="#9EA0A4"
                />
            </View>

            <Text style={styles.title}>Meal</Text>
            <View style={styles.button}>
                <ButtonChoose 
                    title="Breakfast" 
                    onPress={() => setMeal({ ...meal, breakfast: !meal.breakfast })} 
                    selected={meal.breakfast}
                    containerStyle={ButtonChooseStyles.container}
                    unselTextStyle={ButtonChooseStyles.unselectText}
                    selTextStyle={ButtonChooseStyles.selectText}
                    unselStyle={ButtonChooseStyles.unselectButton}
                    selStyle={ButtonChooseStyles.selectButton}
                    />

                <ButtonChoose 
                    title="Lunch" 
                    onPress={() => setMeal({ ...meal, lunch: !meal.lunch })}
                    selected={meal.lunch}
                    containerStyle={ButtonChooseStyles.container}
                    unselTextStyle={ButtonChooseStyles.unselectText}
                    selTextStyle={ButtonChooseStyles.selectText}
                    unselStyle={ButtonChooseStyles.unselectButton}
                    selStyle={ButtonChooseStyles.selectButton}
                />

                <ButtonChoose 
                    title="Dinner" 
                    onPress={() => setMeal({ ...meal, dinner: !meal.dinner })}
                    selected={meal.dinner}
                    containerStyle={ButtonChooseStyles.container}
                    unselTextStyle={ButtonChooseStyles.unselectText}
                    selTextStyle={ButtonChooseStyles.selectText}
                    unselStyle={ButtonChooseStyles.unselectButton}
                    selStyle={ButtonChooseStyles.selectButton}
                />
            </View>
        
            <Text style={styles.title}>Ingredients</Text>

            <View style={styles.ingredientsList}>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <TextBoxAmt 
                            placeholder={`Amt `}
                            value={ingredient.amount}
                            onChangeText={(value) => handleAmountChange(index, value)}
                            placeholderTextColor="#9EA0A4"
                            //onIconPress={() => {}}
                        />
                        <TextBoxIngredient
                            placeholder={`Ingredient ${index + 1}`}
                            value={ingredient.name}
                            onChangeText={(value) => handleDescriptionChange(index, value)}
                            placeholderTextColor="#9EA0A4"
                        />
                        <ButtonImage 
                            outerStyle={ButtonTrashStyles.button}
                            style={ButtonTrashStyles.container} 
                            source={require('../assets/images/Trash.png')} 
                            onPress={() => handleDeleteInstruction(index)} />
                        
                    </View>
                ))}
            </View>

            <ButtonAdd title="+ Add Ingredient" onPress={handleAddIngredient} />
            
            <Text style={styles.title}>Instructions</Text>
            <View style={styles.ingredientsList}>
                {instructions.map((instruction, index) => (
                    <View key={index} style={styles.instruction}>
                        <TextBoxInstruction
                            placeholder={`Instruction ${index + 1}                                  `}
                            value={instruction}
                            onChangeText={(text) => handleInstructionChange(text, index)}
                            placeholderTextColor="#9EA0A4"
                        />
                        <ButtonImage 
                            outerStyle={ButtonTrashStyles.button}
                            style={ButtonTrashStyles.container} 
                            source={require('../assets/images/Trash.png')} 
                            onPress={() => handleDeleteInstruction(index)} />
                    </View>
                ))}
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
        marginTop: 20,
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
    image: {
        marginBottom: 20,
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

    backgroundVideo: {
        width: '100%',
        height: 300, // Adjust height as per your needs
    },
    videoContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        minHeight: 200,
        marginBottom: 20,
    }
})
