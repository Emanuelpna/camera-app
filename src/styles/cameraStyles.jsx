import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 20,
    },
    foodLabel: {
        fontSize: 24,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    searchButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    initialMessageOverlay: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    initialMessageText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 15,
        borderRadius: 8,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Garante que o loading fique por cima da câmera
    },
    loadingText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
});