import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function LemmeCook() {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('log-in' as never);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigation]);
  
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#129575', 
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View><Image source={require('../assets/images/logo.png')}/></View>
        </View>
        
    );
}