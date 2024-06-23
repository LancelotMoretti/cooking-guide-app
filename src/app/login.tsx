import { View, Text, Button } from 'react-native';
import LoginHeader from '@/styles/Header';
import { useState } from 'react';
import InputTextBox from '@/components/InputTextBox';

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
                marginTop: 100,
                marginLeft: 20,
                marginRight: 20
            }}>
                <InputTextBox 
                    label="Email"
                    placeholder="example@example.com"
                    secureTextEntry={false}
                    value={email}
                    onChangeText={setEmail}
                    onIconPress={() => {}}
                />
                <InputTextBox 
                    label="Password"
                    placeholder="Enter your password"
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={setPassword}
                    onIconPress={toggleSecureEntry}
                />
            </View>
        </View>
    );
}