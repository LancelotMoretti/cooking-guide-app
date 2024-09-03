import { StyleSheet } from 'react-native';

export const NotificationBoxStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        cursor: 'pointer',
    },
    content: {
        flex: 1,
    },
    newRecipe: {
        fontWeight: 700,
        fontSize: 18,
    },
    title: {
        color: '#555',
        fontSize: 16,
        fontWeight: 500,
    },
    author: {
        color: '#888',
        fontSize: 12,
        fontStyle: 'italic',
    },
    time: {
        color: '#aaa',
        fontSize: 12,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        color: 'red',
    },
    read: {
        backgroundColor: '#f0f0f0',
    },
    unread: {
        backgroundColor: '#fff',
    },
    deleteButtton: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: 0,
        padding: 10,
    },
});

export const NotificationScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    activeFilter: {
        backgroundColor: '#129575',
        color: '#129575',
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 18,
        color: '#129575',
    },
    buttonTextActive: {
        color: '#fff',
    },
});
