import { StyleSheet } from 'react-native';

export const TextBoxStyles = StyleSheet.create({
    container: {
        flex: 4,
        padding: 8,
        backgroundColor: '#E3F6F5',
        borderRadius: 10,
        marginRight: 8,
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#000'
    },
});

export const ButtonSearchStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      button: {
        marginBottom: 10,
        height: 40,
        backgroundColor: '#9FEADD',
        paddingHorizontal: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
});