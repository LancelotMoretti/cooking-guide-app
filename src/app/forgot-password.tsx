import { View, Text } from 'react-native';

export default function ForgotPassword() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
            }}>Forgot Password</Text>
        </View>
    );
}