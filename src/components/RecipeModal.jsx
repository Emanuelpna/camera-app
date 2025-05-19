import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import styles from '../styles/recipeModalStyles';

export default function RecipeModal({ visible, onClose, recipes }) {
    const handleRecipePress = (url) => {
        Linking.openURL(url);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Receitas Encontradas</Text>
                    
                    <FlatList
                        data={recipes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.recipeItem}
                                onPress={() => handleRecipePress(item.link)}
                            >
                                <Text style={styles.recipeTitle}>{item.title}</Text>
                                <Text style={styles.recipeSnippet}>{item.snippet}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}