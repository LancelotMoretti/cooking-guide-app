import { StyleSheet } from "react-native";

export const CheckboxStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checked: {
        width: 12,
        height: 12,
        backgroundColor: '#000'
    },
    label: {
        fontSize: 16
    }
});