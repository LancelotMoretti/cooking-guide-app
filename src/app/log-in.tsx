import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LoginHeader } from '@/styles/Header';
import { useState } from 'react';
import { SignTextBox, SecureSignTextBox } from '@/components/UI/textBox/SignTextBox';
import { SignButton } from '@/components/UI/button/Button';
import { navigateToStack } from '@/components/routingAndMiddleware/Navigation';
import { ClickableText } from '@/components/UI/clickable/ClickableText';
import { ClickableLogo } from '@/components/UI/clickable/ClickableLogo';
import { Checkbox } from '@/components/UI/tickable/Checkbox';
import { loginAndGoToHome } from '@/temp/loginServices';
import { useNavigation } from 'expo-router';
import { useToggle } from '@/hooks/useToggle';
import { SignBoxStyles, SignButtonStyles } from '@/styles/Sign';
import { imageMap } from '@/styles/ImageMap';
import { CheckboxStyles } from '@/styles/Checkbox';
import { ClickableStyles } from '@/styles/ClickableObject';

export default function LoginScreen() {
    const window = Dimensions.get("window");
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                <Text style={SignBoxStyles.label}>Email</Text>
                <SignTextBox
                    style={SignBoxStyles.input}
                    placeholder="example@example.com"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={SignBoxStyles.label}>Password</Text>
                <SecureSignTextBox 
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    style={SignBoxStyles.container}
                />
                <View style={CheckboxStyles.container}>
                    <Checkbox/>
                    <Text>Remember me</Text>
                </View>
            </View>
            
            <View style={{
                marginTop: 15,
                marginLeft: window.width / 2 - 100,
                marginRight: window.width / 2 - 100
            }}>
                <SignButton title="Log In" onPress={handleLogin} containerStyle={SignButtonStyles.container} style={SignButtonStyles.text}/>
                <SignButton title="Sign Up" onPress={navigateToStack(navigation, "sign-up")} containerStyle={SignButtonStyles.container} style={SignButtonStyles.text}/>
            </View>

            <View style={{
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ClickableText children="Forgot Password?" onPress={navigateToStack(navigation, "forgot-password")} />
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
                <ClickableLogo source={imageMap['google-logo']} onPress={navigateToStack(navigation, "(tabs)")} style={[ClickableStyles.clickableLogo, { width: 30, height: 30 }]} />
                <ClickableLogo source={imageMap['facebook-logo']} onPress={navigateToStack(navigation, "(tabs)")} style={[ClickableStyles.clickableLogo, { width: 30, height: 30 }]} />
                <ClickableLogo source={imageMap['apple-logo']} onPress={navigateToStack(navigation, "(tabs)")} style={[ClickableStyles.clickableLogo, { width: 30, height: 30 }]} />
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
                <ClickableText children="Sign Up" onPress={navigateToStack(navigation, "sign-up")}/>
            </View>
        </ScrollView>
    );
}