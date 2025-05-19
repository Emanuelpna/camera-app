import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useCameraImageLabeler } from '../../infra/hooks/useImageLabeler';
import { useState, useEffect } from 'react';
import { searchRecipes } from '../../infra/services/recipeSearchService';
import RecipeModal from '../../components/RecipeModal';
import styles from '../../styles/cameraStyles';

export default function CameraScreen() {
    const { frameProcessor, detectedFood, isProcessing } = useCameraImageLabeler();
    const [initialMessage, setInitialMessage] = useState('Aponte a câmera para um alimento');
    const [recipes, setRecipes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if(detectedFood) {
            setInitialMessage('');
        }
    }, [detectedFood]);

    const handleSearch = async () => {
        if (detectedFood) {
            setIsSearching(true);
            try {
                const results = await searchRecipes(detectedFood);
                setRecipes(results);
                setModalVisible(true);
            } catch (error) {
                console.error('Erro ao buscar receitas:', error);
                // Aqui você pode adicionar um feedback visual para o usuário
            } finally {
                setIsSearching(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                frameProcessor={frameProcessor}
                isActive={true}
            />
            {isProcessing && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.loadingText}>Processando...</Text>
                </View>
            )}
            {!detectedFood && initialMessage ? (
                <View style={styles.initialMessageOverlay}>
                    <Text style={styles.initialMessageText}>{initialMessage}</Text>
                </View>
            ) : (
                detectedFood && (
                    <View style={styles.overlay}>
                        <Text style={styles.foodLabel}>
                            {detectedFood}
                        </Text>
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={handleSearch}
                            disabled={isSearching}
                        >
                            {isSearching ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.buttonText}>Buscar Receitas</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )
            )}

            <RecipeModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                recipes={recipes}
            />
        </View>
    );
}