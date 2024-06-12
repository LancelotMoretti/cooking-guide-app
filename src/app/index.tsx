import { Text, View } from "react-native";

export default function LemmeCook() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 50, // Adjust this value to increase/decrease the text size
        }}
      >Hello World!</Text>
    </View>
  );
}