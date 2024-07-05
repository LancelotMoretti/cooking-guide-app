import { View, Text } from 'react-native';
import { LoginHeader } from '@/constants/Header';
import { useState } from 'react';
import SignBox from '@/components/signAccount/SignTextBox';
import SignButton from '@/components/signAccount/SignButton';
import { navigateToStack } from '@/hooks/useNavigateScreen';
import { ClickableText, ClickableLogo } from '@/components/signAccount/ClickableObject';
import Checkbox from '@/components/signAccount/Checkbox';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    return (
        <View>
            <Text style={LoginHeader}>Login</Text>

            <View style={{
                marginBottom: 20,
                marginTop: 120,
                marginLeft: 30,
                marginRight: 30
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
                marginLeft: 120,
                marginRight: 120
            }}>
                <SignButton buttonText="Log In" onPress={navigateToStack("(tabs)")} />
                <SignButton buttonText="Sign Up" onPress={navigateToStack("sign-up")} />
            </View>

            <View style={{
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ClickableText docHeader="Forgot Password?" onPress={navigateToStack("forgot-password")} />
            </View>

            <View style={{
                marginTop: 50,
                marginLeft: 120,
                marginRight: 120
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
                marginLeft: 120,
                marginRight: 120
            }}>
                <ClickableLogo fileName='google-logo' onPress={navigateToStack("(tabs)")} />
                <ClickableLogo fileName='facebook-logo' onPress={navigateToStack("(tabs)")} />
                <ClickableLogo fileName='apple-logo' onPress={navigateToStack("(tabs)")} />
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
                <ClickableText docHeader="Sign Up" onPress={navigateToStack("sign-up")}/>
            </View>
        </View>
    );
}