import { View, Text, Button, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { ButtonPublish } from '@/components/UI/button/Button';
import { ButtonImageText } from '@/components/UI/button/ButtonImageText';
import { ButtonImageTextStyles } from '@/styles/Setting';
import { logout } from '@/components/services/authService';

export default function Setting() {
    const navigationSetting = useNavigation();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        logout(navigationSetting); // Gọi hàm logout nếu cần thực hiện đăng xuất từ hệ thống
        setShowLogoutDialog(false);
        navigateToStack(navigationSetting, "log-in")();
    };

    return (
        <ScrollView>
            <ButtonImageText
                onPress={navigateToStack(navigationSetting, "help")}
                outerStyleContainer={ButtonImageTextStyles.outercontainer}
                interStyleContainer={ButtonImageTextStyles.intercontainer}
                IoncStyle={ButtonImageTextStyles.ionc}
                TextStyle={ButtonImageTextStyles.text}
                source={require('../assets/images/Help.png')} 
                title="Help"
            />
            <ButtonImageText
                onPress={navigateToStack(navigationSetting, "foundation")}
                outerStyleContainer={ButtonImageTextStyles.outercontainer}
                interStyleContainer={ButtonImageTextStyles.intercontainer}
                IoncStyle={ButtonImageTextStyles.ionc}
                TextStyle={ButtonImageTextStyles.text}
                source={require('../assets/images/foundation.png')} 
                title="Foundation"
            />
            <ButtonImageText
                onPress={() => setShowLogoutDialog(true)} // Thêm sự kiện onPress để mở hộp thoại xác nhận đăng xuất
                outerStyleContainer={ButtonImageTextStyles.outercontainer}
                interStyleContainer={ButtonImageTextStyles.intercontainer}
                IoncStyle={ButtonImageTextStyles.ionc}
                TextStyle={ButtonImageTextStyles.text}
                source={require('../assets/images/log-out.png')} 
                title="Log out"
            />

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