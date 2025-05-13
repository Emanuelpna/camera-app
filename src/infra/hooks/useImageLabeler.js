import { useFrameProcessor } from "react-native-vision-camera";
import { useImageLabeler } from "react-native-vision-camera-v3-image-labeling";
import { runOnJS } from "react-native-reanimated";
import { useState } from "react";

const ALLOWED_FOODS = [
    "apple",
    "banana",
    "orange",
    "grape",
    "strawberry",
    "watermelon",
    "kiwi",
    "pineapple",
    "mango",
    "blueberry",
]

export function useCameraImageLabeler() {
    const [detectedFood, setDetectedFood] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { scanImage } = useImageLabeler({ minConfidence: 0.7 });

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
        
        setIsProcessing(true); // Indica que o processamento começou
        try {
            const data = scanImage(frame);

            if (data && data.length > 0) {
                const foodLabels = data.filter(item =>
                    item.confidence > 0.8 &&
                    ALLOWED_FOODS.includes(item.label.toLowerCase())
                );

                if (foodLabels.length > 0) {
                    const bestMatch = foodLabels.reduce((prev, current) =>
                        prev.confidence > current.confidence ? prev : current
                    );

                    runOnJS(setDetectedFood)(bestMatch.label);
                } else {
                    runOnJS(setDetectedFood)(null); // Limpa o estado se nenhum alimento for encontrado
                }
            } else {
                runOnJS(setDetectedFood)(null);
            }
        } catch (error) {
            console.error("Erro ao processar frame:", error);
            // Trocar depois a logica de erro, melhorar a forma de tratar o erro
            runOnJS(setDetectedFood)(null); // Limpa o estado em caso de erro
        } finally {
            setIsProcessing(false); // Indica que o processamento terminou
        }
    }, []);

    return {
        frameProcessor,
        detectedFood,
        isProcessing 
    };
}