import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { useCameraImageLabeler } from "../infra/hooks/useImageLabeler";
import { useState, useEffect } from "react";
import { searchRecipes } from "../infra/services/recipeSearchService";
import RecipeModal from "../components/RecipeModal";
import styles from "../styles/cameraStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function CameraScreen() {
  const {
    frameProcessor,
    detectedFood,
    isProcessing,
    resetDetection,
    getFoodCategory,
  } = useCameraImageLabeler();

  const [initialMessage, setInitialMessage] = useState(
    "Aponte a câmera para um alimento"
  );
  const [recipes, setRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const devices = useCameraDevices();
  const device = devices[0];

  useEffect(() => {
    if (detectedFood?.name) {
      setInitialMessage("");
    }
  }, [detectedFood]);

  const handleSearch = async () => {
    if (detectedFood?.name) {
      setIsSearching(true);
      try {
        const results = await searchRecipes(detectedFood.name);
        setRecipes(results);
        setModalVisible(true);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
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
        device={device}
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
            <View style={styles.foodInfo}>
              <Text style={styles.foodLabel}>{detectedFood.name}</Text>
              {detectedFood.category && (
                <Text style={styles.categoryLabel}>
                  Categoria: {detectedFood.category}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <MaterialIcons
                    name="search"
                    size={24}
                    color="white"
                    style={styles.searchIcon}
                  />
                  <Text style={styles.buttonText}>Buscar Receitas</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetDetection}
            >
              <MaterialIcons name="refresh" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )
      )}

      <RecipeModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          resetDetection();
        }}
        recipes={recipes}
      />
    </View>
  );
}
