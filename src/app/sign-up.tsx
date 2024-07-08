import { PrivacyPolicy } from '@/assets/docs/PrivacyPolicy';
import { TermsOfUse } from '@/assets/docs/TermsOfUse';
import { ClickableText } from '@/components/signAccount/ClickableObject';
import SignButton from '@/components/signAccount/SignButton';
import SignBox from '@/components/signAccount/SignTextBox';
import { SignUpHeader } from '@/constants/Header';
import { useToggle } from '@/hooks/useToggle';
import { navigateToStack } from '@/services/navigateServices';
import { signUpAndGoToLogin } from '@/services/registerServices';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';

export default function SignUp() {
    const window = Dimensions.get("window");
    const navigation = useNavigation();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [secureTextEntry1, toggleSecureEntry1] = useToggle(true);
    const [secureTextEntry2, toggleSecureEntry2] = useToggle(true);

    const handleSignUp = () => {
        signUpAndGoToLogin(navigation, email, password, fullName, phoneNumber, dateOfBirth);
    };

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
                <SignBox
                    label="Full Name"
                    placeholder="John Doe"
                    secureTextEntry={false}
                    value={fullName}
                    onChangeText={setFullName}
                    onIconPress={() => {}}
                />
                <SignBox
                    label="Email"
                    placeholder="example@example.com"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                    onIconPress={() => {}}
                />
                <SignBox
                    label="Phone Number (optional)"
                    placeholder="123-456-7890"
                    secureTextEntry={false}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    onIconPress={() => {}}
                />
                <SignBox
                    label="Date of Birth (optional)"
                    placeholder="MM/DD/YYYY"
                    secureTextEntry={false}
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                    onIconPress={() => {}}
                />
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
                marginTop: 15,
                alignItems: "center"
            }}>
                <Text>By continuing, you agree to</Text>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <ClickableText docHeader="Terms of Use" onPress={navigateToStack(navigation, "doc", "Terms of use", TermsOfUse)} />
                <Text> and </Text>
                <ClickableText docHeader="Privacy Policy" onPress={navigateToStack(navigation, "doc", "Privacy Policy", PrivacyPolicy)} />
            </View>

            <View style={{
                marginLeft: window.width / 2 - 100,
                marginRight: window.width / 2 - 100
            }}>
                <SignButton buttonText="Sign Up" onPress={handleSignUp} />
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
            }}>
                <Text>Already have an account? </Text>
                <ClickableText docHeader="Log In" onPress={navigateToStack(navigation, "log-in")} />
            </View>
        </ScrollView>
    );
}