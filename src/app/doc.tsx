import { DocHeader } from "@/styles/Header";
import { useRoute } from "@react-navigation/native";
import { ScrollView, View, Text } from "react-native";

export default function DocScreen() {
    const route = useRoute();
    const { header: docHeader, content: docContent } = route.params as { header: string, content: string };

    return (
        <ScrollView style={{
            flex: 1
        }}>
            <View style={{
                alignItems: "center",
                marginTop: 20
            }}>
                <Text style={DocHeader}>{docHeader}</Text>
                <Text style={{
                    fontSize: 16,
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                }}>{docContent}</Text>
            </View>
        </ScrollView>
    );
}