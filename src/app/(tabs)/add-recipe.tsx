import { ScrollView, View, Text, TextInput, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import Video from 'react-native-video';
import * as ImagePicker from 'expo-image-picker';
import { AddRecipeHeader } from '@/styles/Header';
import { ButtonFirst, ButtonPublish, ButtonAdd, ButtonAddVideo} from '@/components/UI/button/Button';
import { ButtonImage } from '@/components/UI/button/ButtonImg';
import { ButtonChoose } from '@/components/UI/button/ButtonChoose';
import { TextBox, TextBoxAmt, TextBoxIngredient, TextBoxInstruction, TextBoxTime } from '@/components/UI/textBox/TextBox';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { remove } from 'firebase/database';
import { saveNewRecipe, saveUpdatedRecipe } from '@/temp/recipeServices';
import { createRecipe } from '@/components/services/recipeService';
//import { Recipe } from '@/components/models/Recipe';
import {Recipe } from '@/temp/recipeServices';
import { ButtonTrashStyles,  ButtonAddVideoStyles, ButtonChooseStyles } from '@/styles/AddRecipe';


export default function AddRecipe() {
    const navigation = useNavigation();
    
    const [video, setVideo] = useState<any | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
// <<<<<<< HEAD
    const [timeRecipe, setTimeRecipe] = useState<{hour: number, minute: number}>({ hour: 0, minute: 0 });
// =======
//     const [hourRecipe, setHourRecipe] = useState(0);
//     const [minuteRecipe, setMinuteRecipe] = useState(0);
// >>>>>>> 4ec14c42539416209f9b6405714e830d60055157
    const [meal, setMeal] = useState({ breakfast: false, lunch: false, dinner: false });
    const [ingredients, setIngredients] = useState<{ name: string, amount: string}[]>([]);

    const [instructions, setInstructions] = useState(['']);

    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const validateFields = (): boolean => {
// <<<<<<< HEAD
        if (title == '' || description == '' || (!timeRecipe.hour && !timeRecipe.minute) || ingredients.length === 0 || instructions.length === 0 || !meal) {
// =======
//         if (title == '' || description == '' || ingredients.length === 0 || 
//             instructions.length === 0 || !meal || hourRecipe === 0 && minuteRecipe === 0
//         ) {
// >>>>>>> 4ec14c42539416209f9b6405714e830d60055157
            Alert.alert('Missing Information', 'Please fill in all the fields before publishing.');
            return false;
        }
        return true;
    };


    const handlePublish = () => {
        if (validateFields()) {

        saveNewRecipe(
            {
                recipeID: '0',
                userID: '0'.toString(),
                title: title,
                description: description,
                date: new Date(),
                //duration: { hours: hourRecipe, minutes: minuteRecipe },
                duration: { hours: timeRecipe.hour, minutes: timeRecipe.minute },
                ingredients: ingredients,
                steps: instructions,
                video: video,
                tags: [],
                rating: 0,
                meal: meal,
                comments: [],
                status: "Pending",
                // toPlainObject: () => ({}),
                // getRecipeID: () => '0',
                // getUserID: () => '0'
            }
        );
        setModalVisible(false);
        console.log('Recipe published');
    }
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

    const handleAddVideo = async () => {
        // Xử lý thêm video ở đây
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
    const isVideo = video && (video.endsWith('.mov') || video.endsWith('.mp4')); // Extend this list as needed
    
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: ''}]);
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

// <<<<<<< HEAD
    const handleHourChange = (text: string) => {
        const parsed = parseInt(text, 10);
        if (!isNaN(parsed)) {
          setTimeRecipe(prevState => ({ ...prevState, hour: parsed }));
        }

        else if (text === '') { setTimeRecipe(prevState => ({ ...prevState, hour: 0 })); } };

    const handleMinuteChange = (text: string) => { 
        const parsed = parseInt(text, 10); 
        if (!isNaN(parsed)) { setTimeRecipe(prevState => ({ ...prevState, minute: parsed })); } 
        else if (text === '') { setTimeRecipe(prevState => ({ ...prevState, minute: 0 })); } };

// =======
//     const handleNumberInput = (value: string, setter: any) => {
//         const numericValue = value.replace(/[^0-9]/g, ''); // Loại bỏ tất cả các ký tự không phải số
//         setter(numericValue);
//     };
// >>>>>>> 4ec14c42539416209f9b6405714e830d60055157

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >    
        <ScrollView style={styles.container}>
            <Text style={AddRecipeHeader}>Create Recipe</Text>
            <View style={styles.button}>
                <ButtonFirst title="Publish" onPress={() => setModalVisible(true)} />
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
                        <Text style={styles.modalTitle}>Publish Recipe</Text>
                        <Text>Are you sure you want to publish the recipe?</Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonPublish title="Cancel" onPress={handleCloseModal} />
                            <ButtonPublish title="Publish" onPress={() => {
                                handlePublish();
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
            <View style = {styles.backgroundVideo}>
            <ImageBackground
                source={video ? { uri: video } : require('../../assets/images/addRecipe/Food.png')}
                style={styles.videoContainer}
                imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
            >
            </ImageBackground>    
            <ButtonAdd 
                            //style={styles.centerButtonContainer} 
                            //containerStyle={styles.centerButtonContainer}
                            title="Add Image"
                            onPress={handleAddVideo} 
            />
                {/* {video && isVideo ? (<Video
                        source={{ uri: video }} // Video URL
                        style={styles.backgroundVideo} // Video styling
                        controls={true} // Show media controls (play, pause, etc.)
                        resizeMode="cover" // Adjusts how the video is scaled
                    />) : video && ( */}
                        {/* <ImageBackground
                            source={{ uri: video }}
                            style={styles.backgroundVideo}
                            imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}
                        /> */}
                    
            
            </View>

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

            <View style={styles.ingredientRow}>
                <Text>Hours: </Text>
                <TextBoxTime
                    //style={styles.textBox}
                    placeholder="Hour"
                    value={timeRecipe.hour.toString()} // Đảm bảo rằng giá trị luôn là chuỗi
                    onChangeText={handleHourChange}
                    keyboardType="numeric" // Đảm bảo bàn phím chỉ hiển thị số
                    placeholderTextColor="#9EA0A4"
                />
                <Text>Minutes: </Text>
                <TextBoxTime
                        //style={styles.textBox}
                        placeholder="Miniute"
                        value={timeRecipe.minute.toString()} // Đảm bảo rằng giá trị luôn là chuỗi
                        onChangeText={handleMinuteChange}
                        keyboardType="numeric" // Đảm bảo bàn phím chỉ hiển thị số
                        placeholderTextColor="#9EA0A4"
                    />
{/* =======
            <View style={styles.button}>
                <TextInput
                    style={styles.textBox}
                    placeholder="Hours"
                    value={hourRecipe.toString() + ' hours'}
                    onChangeText={(value) => handleNumberInput(value, setHourRecipe)}
                    keyboardType="numeric"
                    placeholderTextColor="#9EA0A4"
                />
                <TextInput
                    style={styles.textBox}
                    placeholder="Minutes"
                    value={minuteRecipe.toString() + ' minutes'}
                    onChangeText={(value) => handleNumberInput(value, setMinuteRecipe)}
                    keyboardType="numeric"
                    placeholderTextColor="#9EA0A4"
                />
>>>>>>> 4ec14c42539416209f9b6405714e830d60055157 */}
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
                            onChangeText={(value: string) => handleAmountChange(index, value)}
                            placeholderTextColor="#9EA0A4"
                            //onIconPress={() => {}}
                        />
                        <TextBoxIngredient
                            placeholder={`Ingredient ${index + 1}                `}
                            value={ingredient.name}
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
        marginTop: 20,
        marginHorizontal: 30,
    },
    button: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    textBox: {
        borderColor: '#9EA0A4',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        fontSize: 16,
        color: '#000',
        width: '45%',
        backgroundColor: '#a5e7dc',
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

    backgroundVideo: {
        width: '100%',
        height: 300, // Adjust height as per your needs
      },
    videoContainer: {
        //flex: 1,
        //justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        //minWidth: '100%',
        minHeight: 200,
        //position: 'relative', 
        marginBottom: 20,
    },

    centerButtonContainer: {
        //position: 'absolute',
        //top: '40%',
        //left: '40%',
        //transform: [{ translateX: -35 }, { translateY: -35 }],
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
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