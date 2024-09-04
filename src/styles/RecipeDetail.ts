import { StyleSheet } from 'react-native';

export const TextBoxIngreStyles = StyleSheet.create({
    container: {
        flex: 3,
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        fontSize: 16,
    },
});

export const ButtonEditStyles = StyleSheet.create({
    container: {
    
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        //alignSelf: 'center', // Center horizontally
        //justifyContent: 'center',
        width: '20%',
        marginBottom: 20,
        marginTop: 10,
    },
    text: {
        color: '#129575',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
