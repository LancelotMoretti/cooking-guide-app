import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LoginHeader } from '@/constants/Header';
import { useState } from 'react';
import SignBox from '@/components/signAccount/SignTextBox';
import SignButton from '@/components/signAccount/SignButton';
import { navigateToStack } from '@/services/navigateServices';
import { ClickableText, ClickableLogo } from '@/components/signAccount/ClickableObject';
import Checkbox from '@/components/signAccount/Checkbox';
import { loginAndGoToHome } from '@/services/loginServices';
import { useNavigation } from 'expo-router';
import { useToggle } from '@/hooks/useToggle';

export default function Login() {
    const window = Dimensions.get("window");
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [secureTextEntry, toggleSecureEntry] = useToggle(true);

    const handleLogin = () => {
        loginAndGoToHome(navigation, email, password);
    }

    return (
        <ScrollView style = {{
            flex: 1,
            backgroundColor: '#FFFFFF'
        }}>
            <Text style={LoginHeader}>Login</Text>

            <View style={{
                marginBottom: 20,
                marginTop: 120,
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
                <SignBox 
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={setPassword}
                    onIconPress={toggleSecureEntry}
                    needSecure={true}
                />
                <Checkbox content="Remember me" />
            </View>
            
            <View style={{
                marginTop: 15,
                marginLeft: window.width / 2 - 100,
                marginRight: window.width / 2 - 100
            }}>
                <SignButton buttonText="Log In" onPress={handleLogin} />
                <SignButton buttonText="Sign Up" onPress={navigateToStack(navigation, "sign-up")} />
            </View>

            <View style={{
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ClickableText docHeader="Forgot Password?" onPress={navigateToStack(navigation, "forgot-password")} />
            </View>

            <View style={{
                marginTop: 50,
                marginLeft: window.width / 2 - 100,
                marginRight: window.width / 2 - 100
            }}>
                <Text style={{
                    fontSize: 16,
                    textAlign: "center"
                }}>or sign up with</Text>
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
                marginLeft: window.width / 2 - 100,
                marginRight: window.width / 2 - 100
            }}>
                <ClickableLogo fileName='google-logo' onPress={navigateToStack(navigation, "(tabs)")} />
                <ClickableLogo fileName='facebook-logo' onPress={navigateToStack(navigation, "(tabs)")} />
                <ClickableLogo fileName='apple-logo' onPress={navigateToStack(navigation, "(tabs)")} />
            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 16,
                    textAlign: "center"
                }}>Don't have an account?</Text>
                <ClickableText docHeader="Sign Up" onPress={navigateToStack(navigation, "sign-up")}/>
            </View>
        </ScrollView>
    );
}