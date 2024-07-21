import { ScrollView, View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { AddRecipeHeader } from '@/constants/Header';
import Button from '@/components/addRecipe/Button';
import ButtonPublish from '@/components/addRecipe/ButtonPublish';
import ButtonAdd from '@/components/addRecipe/ButtonAdd';
import ButtonTrash from '@/components/addRecipe/ButtonTrash';
import Box from '@/components/addRecipe/TextBox';
import BoxAmt from '@/components/addRecipe/TextBoxAmt';
import BoxIngredient from '@/components/addRecipe/TextBoxIngredient';
import BoxInstruction from '@/components/addRecipe/TextBoxInstruction';
import { useNavigation } from 'expo-router';
import { navigateToStack } from '@/services/navigateServices';
import { remove } from 'firebase/database';

export default function AddRecipe() {
    const navigation = useNavigation();
    
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
            <Text style={AddRecipeHeader}>Edit Recipe</Text>
            <View style={styles.button}>
                <Button buttonText="Update" onPress={() => setModalVisible(true)} />
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
                        <Text style={styles.modalTitle}>Update Recipe</Text>
                        <Text>Are you sure you want to update the recipe?</Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonPublish buttonText="Cancel" onPress={handleCloseModal} />
                            <ButtonPublish buttonText="Update" onPress={() => {handlePublish()}} />
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

            <View style={styles.image}>
                <Image source={require('../../assets/images/addRecipe/Food.png')} style={{ width: '100%' }} />
            </View>

            <Text style={styles.title}>Desription</Text>
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
    
});