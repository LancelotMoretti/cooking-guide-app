import { View, Text} from 'react-native';
import { LoginHeader } from '@/constants/Header';
import { useState } from 'react';
import SignBox from '@/components/signAccount/SignTextBox';
import SignButton from '@/components/signAccount/SignButton';
import { navigateToScreen } from '@/components/navigation/StackNavigationButton';

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
            </View>
            
            <View style={{
                marginTop: 75,
                marginLeft: 120,
                marginRight: 120
            }}>
                <SignButton buttonText="Log In" onPress={navigateToScreen("(tabs)")} />
                <SignButton buttonText="Sign Up" onPress={navigateToScreen("signup")} />
            </View>
        </View>
    );
}