import { SignButton } from '@/components/UI/button/Button';
import { SecureSignTextBox, SignTextBox } from '@/components/UI/textBox/SignTextBox';
import { LoginHeader } from '@/styles/Header';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity } from 'react-native';
import { SignBoxStyles, SignButtonStyles } from '@/styles/Sign';
import { set } from 'firebase/database';

export default function ForgotPassword() {
    const window = Dimensions.get("window");
    const navigation = useNavigation();

    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openModal, setOpenModal] = useState(false);

    function renderModal() {
        return (
            <Modal visible={openModal} animationType="slide" transparent={true}>
                <View 
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#FFFFFF',
                            paddingVertical: 40,
                            paddingHorizontal: 30,
                            borderRadius: 30,
                            width: '70%',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ 
                            fontSize: 20, 
                            fontWeight: 'bold', 
                            color: '#4F3C3C', 
                            marginBottom: 20,
                        }}>
                            Change Password Successful!
                        </Text>

                        <View style={{ 
                            backgroundColor: '#AAF0D1', 
                            borderRadius: 10, 
                            padding: 15, 
                            marginBottom: 20,
                        }}>
                            <Text style={{ 
                                fontSize: 30, 
                                color: '#AAF0D1',
                            }}>✓</Text>
                        </View>

                        <Text style={{ 
                            fontSize: 16, 
                            color: '#4F3C3C', 
                            marginBottom: 20,
                        }}>
                            Returning to log in screen...
                        </Text>

                        <TouchableOpacity
                            onPress={navigateToStack(navigation, 'log-in')}
                            style={{
                                backgroundColor: '#AAF0D1',
                                paddingVertical: 12,
                                paddingHorizontal: 15,
                                borderRadius: 30,
                                width: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ 
                                color: '#4F3C3C',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                                Go To Home
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    const handleEmailSubmit = () => {
        setStep(1);
    }

    const handleCodeSubmit = () => {
        setStep(2);
    }

    const handlePasswordSubmit = () => {
        setOpenModal(true);
    }

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <ScrollView style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF'
                    }}>
                        <Text style={LoginHeader}>Forgot Your Password</Text>

                        <View style={{
                            marginBottom: 20,
                            marginTop: 20,
                            marginLeft: window.width / 2 - 180,
                            marginRight: window.width / 2 - 180
                        }}>
                            <Text style={styles.title}>Hello there!</Text>
                            <Text style={styles.subtitle}>
                                Enter your email address. We will send you a code verification in the next step.
                            </Text>
                        </View>

                        <View style={{
                            marginBottom: 20,
                            marginTop: 20,
                            marginLeft: window.width / 2 - 180,
                            marginRight: window.width / 2 - 180
                        }}>
                            <Text style={SignBoxStyles.label}>Email</Text>
                            <SignTextBox
                                style={SignBoxStyles.input}
                                outerStyle={SignBoxStyles.inputContainer}
                                placeholder="example@example.com"
                                secureTextEntry={false}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={{
                            marginTop: window.height / 2,
                            marginLeft: window.width / 2 - 100,
                            marginRight: window.width / 2 - 100
                        }}>
                            <SignButton title="Continue" onPress={handleEmailSubmit} containerStyle={SignButtonStyles.container} style={SignButtonStyles.text}/>
                        </View>
                    </ScrollView>
                );
            case 1:
                return (
                    <ScrollView style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF'
                    }}>
                        <Text style={LoginHeader}>Forgot Your Password</Text>

                        <View style={{
                            marginBottom: 20,
                            marginTop: 30,
                            marginLeft: window.width / 2 - 180,
                            marginRight: window.width / 2 - 180
                        }}>
                            <Text style={styles.title}>You've Got Mail</Text>
                            <Text style={styles.subtitle}>
                                We will send you the verification code to your email address, check your email and put the code right below ..
                            </Text>
                        </View>

                        <View style={{
                            marginBottom: 20,
                            marginTop: 20,
                            marginLeft: window.width / 2 - 180,
                            marginRight: window.width / 2 - 180
                        }}>
                            <Text style={SignBoxStyles.label}>Verification Code</Text>
                            <SignTextBox
                                style={SignBoxStyles.input}
                                outerStyle={SignBoxStyles.inputContainer}
                                placeholder="123456"
                                secureTextEntry={false}
                                value={code}
                                onChangeText={setCode}
                            />
                        </View>

                        <View style={{
                            marginTop: 20,
                            alignItems: 'center'
                        }}>
                            <Text style={styles.subtitle}>
                                Didn't receive the code? <Text style={{ color: 'blue' }}>Resend</Text>
                            </Text>
                        </View>

                        <View style={{
                            marginTop: window.height / 2 - 80,
                            marginLeft: window.width / 2 - 100,
                            marginRight: window.width / 2 - 100
                        }}>
                            <SignButton title="Continue" onPress={handleCodeSubmit} containerStyle={SignButtonStyles.container} style={SignButtonStyles.text}/>
                        </View>
                    </ScrollView>
                );
            case 2:
                return (
                    <ScrollView style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF'
                    }}>
                        <Text style={LoginHeader}>Create A New Password</Text>

                        <View style={{
                            marginBottom: 20,
                            marginTop: 30,
                            marginLeft: window.width / 2 - 180,
                            marginRight: window.width / 2 - 180
                        }}>
                            <Text style={styles.title}>Almost There!</Text>
                            <Text style={styles.subtitle}>
                                Enter your new password. If you forgot it then you have to do the step of forgot password.
                            </Text>
                        </View>

                        <View style={{
                            marginBottom: 20,
                            marginTop: 20,
                            marginLeft: window.width / 2 - 180,
                            marginRight: window.width / 2 - 180
                        }}>
                            <Text style={SignBoxStyles.label}>Password</Text>
                            <SecureSignTextBox
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                style={SignBoxStyles.container}
                                placeholderTextColor={"#9EA0A4"}
                            />
                            <Text style={SignBoxStyles.label}>Confirm Password</Text>
                            <SecureSignTextBox
                                placeholder="Enter your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                style={SignBoxStyles.container}
                                placeholderTextColor={"#9EA0A4"}
                            />
                        </View>

                        <View style={{
                            marginTop: window.height / 2 - 100,
                            marginLeft: window.width / 2 - 100,
                            marginRight: window.width / 2 - 100
                        }}>
                            <SignButton title="Continue" onPress={handlePasswordSubmit} containerStyle={SignButtonStyles.container} style={SignButtonStyles.text}/>
                        </View>
                        {renderModal()}
                    </ScrollView>
                );
            default:
                return null;
        }
    }

    return renderStep();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
    },
});