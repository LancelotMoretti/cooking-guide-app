import { StyleSheet } from 'react-native';

export const ButtonImageTextStyles = StyleSheet.create({
    outercontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 20,

    },
    intercontainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 5,
        padding: 5,
        
    },
    ionc: {
        flex: 1,
    },
    text: {
        flex: 6,
        fontSize: 16,
        fontWeight: 'bold',
    }
});