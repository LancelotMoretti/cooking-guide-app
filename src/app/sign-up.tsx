import { PrivacyPolicy } from '@/assets/docs/PrivacyPolicy';
import { TermsOfUse } from '@/assets/docs/TermsOfUse';
import { ClickableText } from '@/components/UI/clickable/ClickableText';
import { SignButton } from '@/components/UI/button/Button';
import { SecureSignTextBox, SignTextBox } from '@/components/UI/textBox/SignTextBox';
import { SignUpHeader } from '@/styles/Header';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { signUpAccount } from '@/temp/registerServices';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, Text, Dimensions, Modal } from 'react-native';
import { SignBoxStyles, SignButtonStyles } from '@/styles/Sign';

export default function SignUpScreen() {
    const window = Dimensions.get("window");
    const navigation = useNavigation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSignUp = () => {
        if (password === confirmPassword) {
            signUpAccount(email, password, fullName, phoneNumber, dateOfBirth);
        }

        setShowModal(true);
    };

    function showSignUpModal() {
        if (password === confirmPassword) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)"
                    }}>
                        <View style={{
                            backgroundColor: "#FFFFFF",
                            padding: 20,
                            borderRadius: 10
                        }}>
                            <Text>Passwords match</Text>
                            <SignButton title="OK" onPress={navigateToStack(navigation, "log-in")} />
                        </View>
                    </View>
                </Modal>
            );
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}>
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        padding: 20,
                        borderRadius: 10
                    }}>
                        <Text>Passwords do not match</Text>
                        <SignButton title="OK" onPress={() => setShowModal(false)} />
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
        }}>
            <Text style={SignUpHeader}>Sign Up</Text>

            <View style={{
                marginBottom: 20,
                marginTop: 50,
                marginLeft: window.width / 2 - 170,
                marginRight: window.width / 2 - 170
            }}>
                <Text style={SignBoxStyles.label}>Full Name</Text>
                <SignTextBox
                    style={SignBoxStyles.input}
                    placeholder="John Doe"
                    secureTextEntry={false}
                    value={fullName}
                    onChangeText={setFullName}
                />
                <Text style={SignBoxStyles.label}>Email</Text>
                <SignTextBox
                    style={SignBoxStyles.input}
                    placeholder="example@example.com"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={SignBoxStyles.label}>Phone Number</Text>
                <SignTextBox
                    style={SignBoxStyles.input}
                    placeholder="123-456-7890"
                    secureTextEntry={false}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Text style={SignBoxStyles.label}>Date of Birth (optional)</Text>
                <SignTextBox
                    style={SignBoxStyles.input}
                    placeholder="MM/DD/YYYY"
                    secureTextEntry={false}
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                />
                <Text style={SignBoxStyles.label}>Password</Text>
                <SecureSignTextBox
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    style={SignBoxStyles.container}
                />
                <Text style={SignBoxStyles.label}>Comfirm your password</Text>
                <SecureSignTextBox
                    placeholder="Enter your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={SignBoxStyles.container}
                />
            </View>

            <View style={{
                marginTop: 15,
                alignItems: "center"
            }}>
                <Text>By continuing, you agree to</Text>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <ClickableText children="Terms of Use" onPress={navigateToStack(navigation, "doc", "Terms of use", TermsOfUse)} />
                <Text> and </Text>
                <ClickableText children="Privacy Policy" onPress={navigateToStack(navigation, "doc", "Privacy Policy", PrivacyPolicy)} />
            </View>

            <View style={{
                marginLeft: window.width / 2 - 100,
                marginRight: window.width / 2 - 100
            }}>
                <SignButton title="Sign Up" onPress={handleSignUp} containerStyle={SignButtonStyles.container} style={SignButtonStyles.text}/>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <Text>Already have an account? </Text>
                <ClickableText children="Log In" onPress={navigateToStack(navigation, "log-in")} />
            </View>
            {showSignUpModal()}
        </ScrollView>
    );
}