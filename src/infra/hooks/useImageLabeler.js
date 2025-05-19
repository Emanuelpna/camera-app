import { useFrameProcessor } from "react-native-vision-camera";
import { useImageLabeler } from "react-native-vision-camera-v3-image-labeling";
import { runOnJS } from "react-native-reanimated";
import { useState, useCallback } from "react";
import { ALL_FOODS, FOOD_CATEGORIES } from '../constants/foodCategories';

export function useCameraImageLabeler() {
    const [detectedFood, setDetectedFood] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastDetections, setLastDetections] = useState([]);
    const { scanImage } = useImageLabeler({ minConfidence: 0.7 });

    const getFoodCategory = useCallback((food) => {
        return Object.entries(FOOD_CATEGORIES).find(([category, foods]) => 
            foods.includes(food.toLowerCase())
        )?.[0];
    }, []);
    
    const processDetections = useCallback((detections) => {
        if (!detections || detections.length === 0) return null;

        const newDetection = {
            label: detections[0].label,
            confidence: detections[0].confidence,
            timestamp: Date.now()
        };

        // Atualiza histórico e verifica consistência da identificação
        const updatedDetections = [...lastDetections, newDetection].slice(-5);
        const recentDetections = updatedDetections.slice(-3);
        
        setLastDetections(updatedDetections);

        const isConsistent = recentDetections.length === 3 && 
            recentDetections.every(d => d.label.toLowerCase() === newDetection.label.toLowerCase());

        if (isConsistent) {
            const category = getFoodCategory(newDetection.label);
            setDetectedFood({
                name: newDetection.label,
                confidence: newDetection.confidence,
                category
            });
        }
    }, [lastDetections, getFoodCategory]);

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        
        try {
            const data = scanImage(frame);
            
            if (data && data.length > 0) {
                const foodLabels = data
                    .filter(item => item.confidence > 0.8)
                    .filter(item => ALL_FOODS.includes(item.label.toLowerCase()))
                    .sort((a, b) => b.confidence - a.confidence);

                if (foodLabels.length > 0) {
                    runOnJS(processDetections)(foodLabels);
                }
            }
        } catch (error) {
            runOnJS(console.error)("Erro ao processar frame:", error);
        }
    }, [processDetections]);

    const resetDetection = useCallback(() => {
        setDetectedFood(null);
        setLastDetections([]);
    }, []);

    return {
        frameProcessor,
        detectedFood,
        isProcessing,
        resetDetection,
        getFoodCategory
    };
}