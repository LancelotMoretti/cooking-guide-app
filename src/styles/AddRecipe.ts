import { StyleSheet } from 'react-native';

export const TextBoxStyles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 20
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#000'
    },
});

export const TextBoxTimeStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        marginRight: 15,
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        fontSize: 16,
        padding: 10,
      },
});

export const TextBoxAmtStyles = StyleSheet.create({
    container: {
        flex: 2,
        marginBottom: 10,
        marginRight: 15,
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    input: {
        
        height: 40,
        fontSize: 16,
        padding: 10,

      },
});

export const TextBoxIngreStyles = StyleSheet.create({
    container: {
        flex: 3,
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        fontSize: 16,
      },
});

export const TextBoxInstrStyles = StyleSheet.create({
    container: {
        flex: 6,
        marginBottom: 10,
        marginRight: 15,
        backgroundColor: '#9FEADD',
        borderRadius: 20,
        paddingHorizontal: 20
    },
    input: {
        height: 50,
        fontSize: 16,
      },
});

export const ButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#9FEADD',
        padding: 5,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center', // Center horizontally
        marginBottom: 20,
        
    },
    text: {
        color: '#129575',
        fontWeight: 'bold',
    }
});

export const ButtonPublishStyles = StyleSheet.create({
    container: {
        backgroundColor: '#a5e7dc',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
        
    },
    text: {
        color: '#129575',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export const ButtonAddVideoStyles = StyleSheet.create({
    container: {
        backgroundColor: '#129575',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center', // Center horizontally
        width: '60%',
        marginBottom: 20,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export const ButtonAddStyles = StyleSheet.create({
    container: {
        backgroundColor: '#129575',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center', // Center horizontally
        width: '60%',
        marginBottom: 20,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export const ButtonTrashStyles = StyleSheet.create({
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

export const ButtonChooseStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginBottom: 10,
        
      },
    unselectText: {
        color: '#129575',
        fontWeight: 'bold',
    },
    selectText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
      unselectButton: {
        height: 30,
        backgroundColor: '#9FEADD',
        paddingHorizontal: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      selectButton: {
        height: 30,
        backgroundColor: '#129575',
        paddingHorizontal: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
});