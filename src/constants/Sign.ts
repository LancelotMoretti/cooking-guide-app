import { StyleSheet } from 'react-native';

export const SignBoxStyles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#000'
    },
    icon: {
        marginLeft: 10
    }
});

export const SignButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#676767',
        fontWeight: 'bold'
    }
});