import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function LemmeCook() {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('log-in' as never);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [navigation]);
  
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                fontSize: 50, // Adjust this value to increase/decrease the text size
            }}>
                LemmeCook
            </Text>
        </View>
    );
}