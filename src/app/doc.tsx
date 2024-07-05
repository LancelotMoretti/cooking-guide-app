import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";

export default function Doc() {
    const route = useRoute();
    const { docHeader, docContent } = route.params as never;

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: "bold",
            }}>{docHeader}</Text>
            <Text style={{
                fontSize: 16,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20,
            }}>{docContent}</Text>
        </View>
    );
}