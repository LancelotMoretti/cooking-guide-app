import { View, Text } from 'react-native';

export default function SignUp() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
            }}>Sign Up</Text>
        </View>
    );
}