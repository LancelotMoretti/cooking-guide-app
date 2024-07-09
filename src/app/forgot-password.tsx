import SignButton from '@/components/signAccount/SignButton';
import SignBox from '@/components/signAccount/SignTextBox';
import { LoginHeader } from '@/constants/Header';
import { useToggle } from '@/hooks/useToggle';
import { navigateToStack } from '@/services/navigateServices';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

export default function ForgotPassword() {
    const window = Dimensions.get("window");
    const navigation = useNavigation();

    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [secureTextEntry1, toggleSecureEntry1] = useToggle(true);
    const [secureTextEntry2, toggleSecureEntry2] = useToggle(true);

    const handleEmailSubmit = () => {
        setStep(1);
    }

    const handleCodeSubmit = () => {
        setStep(2);
    }

    const handlePasswordSubmit = () => {
        setStep(3);
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
                            <SignBox
                                label="Email"
                                placeholder="example@example.com"
                                secureTextEntry={false}
                                value={email}
                                onChangeText={setEmail}
                                onIconPress={() => {}}
                            />
                        </View>

                        <View style={{
                            marginTop: window.height / 2,
                            marginLeft: window.width / 2 - 100,
                            marginRight: window.width / 2 - 100
                        }}>
                            <SignButton buttonText="Continue" onPress={handleEmailSubmit} />
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
                            <SignBox
                                label="Code"
                                placeholder="123456"
                                secureTextEntry={false}
                                value={code}
                                onChangeText={setCode}
                                onIconPress={() => {}}
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
                            <SignButton buttonText="Continue" onPress={handleCodeSubmit} />
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
                            <SignBox
                                label="Password"
                                placeholder="Enter your password"
                                secureTextEntry={secureTextEntry1}
                                value={password}
                                onChangeText={setPassword}
                                onIconPress={toggleSecureEntry1}
                                needSecure={true}
                            />
                            <SignBox
                                label="Confirm Password"
                                placeholder="Enter your password"
                                secureTextEntry={secureTextEntry2}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                onIconPress={toggleSecureEntry2}
                                needSecure={true}
                            />
                        </View>

                        <View style={{
                            marginTop: window.height / 2 - 100,
                            marginLeft: window.width / 2 - 100,
                            marginRight: window.width / 2 - 100
                        }}>
                            <SignButton buttonText="Continue" onPress={handlePasswordSubmit} />
                        </View>
                    </ScrollView>
                );
            case 3:
                return (
                    <ScrollView style={{
                        flex: 1,
                        backgroundColor: '#FFFFFF'
                    }}>
                        <Text style={LoginHeader}>Change Password Successful!</Text>
                        <SignButton buttonText="Go To Home" onPress={navigateToStack(navigation, "log-in")} />
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