import { ScrollView, View, Text, TextInput, StyleSheet, Image, Modal, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { AddRecipeHeader } from '@/constants/Header';
import Checkbox from '@/components/addRecipe/Checkbox';
import SignButton from '@/components/addRecipe/SignButton';
import SignButtonAdd from '@/components/addRecipe/SignButtonAdd';
import SignBoxAmt from '@/components/addRecipe/TextBoxIngredient';
import SignBox from '@/components/addRecipe/SignTextBox';
import { useState } from 'react';
import { ClickableText, ClickableLogo } from '@/components/signAccount/ClickableObject';
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
        <ScrollView>
            <Text style={AddRecipeHeader}>Create Recipe</Text>

            <View style={styles.button}>
                <SignButton buttonText="Publish" onPress={() => setModalVisible(true)} />
                <SignButton buttonText="Delete" onPress={handleDelete} />
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
                            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handlePublish}>
                                <Text style={styles.modalButtonText}>Publish</Text>
                            </TouchableOpacity>
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
                            <TouchableOpacity style={styles.modalButton} onPress={handleCancelDelete}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmDelete}>
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.image}>
                <Image source={require('../../assets/images/addRecipe/Food.png')} style={{ width: '100%' }} />
            </View>

            <View style={styles.box}>
                <SignBox 
                    label="Description"
                    placeholder="Recipe description"
                    value={description}
                    onChangeText={setDescription}
                    onIconPress={() => {}}
                />
            </View>
            <View style={styles.box}>
                <SignBox 
                    label="Time Recipe"
                    placeholder="1hour, 30min,..."
                    value={timeRecipe}
                    onChangeText={setTimeRecipe}
                    onIconPress={() => {}}
                />
            </View>
        
            <Text style={styles.title}>Ingredients</Text>

            <View>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredient}>
                        <SignBoxAmt 
                            label={``}
                            placeholder={`Amt `}
                            value={ingredient.amount}
                            onChangeText={(value) => handleAmountChange(index, value)}
                            onIconPress={() => {}}
                        />
                        <SignBoxAmt 
                            label={``}
                            placeholder={`Ingredient ${index + 1}                           `}
                            value={ingredient.description}
                            onChangeText={(value) => handleDescriptionChange(index, value)}
                            onIconPress={() => {}}
                        />

                        <ClickableLogo fileName='trash' onPress={handleremoveIngredient}/>    
                        
                    </View>
                ))}
            </View>
            

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
                alignItems: "center"
            }}>
                <SignButtonAdd buttonText="+ Add Ingredient" onPress={handleAddIngredient} />
            </View>

            <Text style={styles.title}>Instructions</Text>
            <View>
              {instructions.map((instruction, index) => (
                    <View key={index} style={styles.instruction}>
                        <SignBoxAmt 
                            label={``}
                            placeholder={`Instruction ${index + 1}                                  `}
                            value={instruction}
                            onChangeText={(text) => handleInstructionChange(text, index)}
                            onIconPress={() => {}}
                        />
                        
                        <ClickableLogo fileName='trash' onPress={handleDeleteInstruction}/>
                    </View>
                ))}
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 20,
                alignItems: "center"
            }}>
                <SignButtonAdd buttonText="+ Add Instruction" onPress={handleAddInstruction} />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    image: {
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 30,
    },
    title: {
        marginHorizontal: 30,
        fontSize: 14,
        fontWeight: 'bold',
        
    },
    box: {
        marginHorizontal: 30,
        
    },
    ingredient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 30,
    },
    instruction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
    },
    trashIcon: {
        width: 24,
        height: 24,
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
    amountIngredient: {
        flex: 1,
        backgroundColor: '#a5e7dc',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
      },
      desIngredient: {
        flex: 3,
        backgroundColor: '#a5e7dc',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
      },
});