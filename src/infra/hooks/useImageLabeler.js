import { useState, useCallback } from "react";
import { useFrameProcessor } from "react-native-vision-camera";
import { useImageLabeler } from "react-native-vision-camera-v3-image-labeling";

import { ALL_FOODS, FOOD_CATEGORIES } from '../../domain/models/categories/foodCategories';

export function useCameraImageLabeler() {
    const [detectedFood, setDetectedFood] = useState(null);
    const { scanImage } = useImageLabeler({ minConfidence: 0.7 });

    const getFoodCategory = useCallback((food) => {
        'worklet';

        return Object.entries(FOOD_CATEGORIES).find(([category, foods]) =>
            foods.includes(food.toLowerCase())
        )?.[0];
    }, []);

    const setDetectedFoodWorklet = Worklets.createRunOnJS(setDetectedFood);
    const getFoodCategoryWorklet = Worklets.createRunOnJS(getFoodCategory);

    const processDetections = useCallback((detections) => {
        'worklet';

        if (!detections || detections.length === 0) return null;

        const newDetection = {
            label: detections[0].label,
            confidence: detections[0].confidence,
            timestamp: Date.now()
        };

        getFoodCategoryWorklet(newDetection.label).then(category => {
            setDetectedFoodWorklet({
                name: newDetection.label,
                confidence: newDetection.confidence,
                category: category ?? detectedFood?.category
            });
        });

    }, [getFoodCategory]);

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';

        try {
            const data = scanImage(frame);

            if (data && data.length > 0) {
                const foodLabels = data
                    .filter(item => item.confidence > 0.5)
                    .filter(item => ALL_FOODS.includes(item.label.toLowerCase()))
                    .sort((a, b) => b.confidence - a.confidence);

                if (foodLabels.length > 0) {
                    processDetections(foodLabels);
                }
            }
        } catch (error) {
            console.error("Erro ao processar frame:", error.message, error.stack);
        }
    }, [processDetections]);

    const resetDetection = useCallback(() => {
        'worklet';

        setDetectedFoodWorklet(null);
    }, []);

    return {
        frameProcessor,
        detectedFood,
        resetDetection,
        getFoodCategory
    };
}