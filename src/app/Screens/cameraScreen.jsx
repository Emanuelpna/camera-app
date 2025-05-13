import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { useCameraImageLabeler } from '../../infra/hooks/useImageLabeler';
import { useState, useEffect } from 'react';

export default function CameraScreen() {
    const { frameProcessor, detectedFood, isProcessing } = useCameraImageLabeler();
    const [initialMessage, setInitialMessage] = useState('Aponte a câmera para um alimento');

    useEffect(() => {
        if(detectedFood) {
            setInitialMessage('');
        }
    }, [detectedFood]);

    const handleSearch = () => {
        if (detectedFood) {
            // Navega para a rota de receitas, passando o alimento detectado como parâmetro
            router.push({
                pathname: '/recipes',
                params: { food: detectedFood }
            });
        }
    }

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
                        >
                            <Text style={styles.buttonText}>Buscar Receitas</Text>
                        </TouchableOpacity>
                    </View>
                )
            )}
        </View>
    );
}


const styles = StyleSheet.create({
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