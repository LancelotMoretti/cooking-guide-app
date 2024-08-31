import { View, Text, Button, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { ButtonPublish } from '@/components/UI/button/Button';

export default function Setting() {
    const navigationSetting = useNavigation();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        setShowLogoutDialog(false);
        navigateToStack(navigationSetting, "log-in")();
    };
    return (
        <ScrollView>
            <Button title="Help" onPress={navigateToStack(navigationSetting, "help")} />
            <Button title="Foundation"  onPress={navigateToStack(navigationSetting, "foundation")} />
            <Button title="Log out"  onPress={()=>setShowLogoutDialog(true)} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLogoutDialog}
                onRequestClose={() => setShowLogoutDialog(false)}
            >
            <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>End Session</Text>
                        <Text>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtonContainer}>
                            <ButtonPublish title="Cancel" onPress={() => setShowLogoutDialog(false)} />
                            <ButtonPublish title="End Session" onPress={handleLogout} />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});