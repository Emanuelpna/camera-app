export default  StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    recipeItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recipeSnippet: {
        fontSize: 14,
        color: '#666',
    },
    closeButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});