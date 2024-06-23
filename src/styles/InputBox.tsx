import { StyleSheet } from 'react-native';

const BoxStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A3E5DC',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginLeft: 10,
    },
});

export default BoxStyles;