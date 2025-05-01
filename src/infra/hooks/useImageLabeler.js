import { useFrameProcessor } from "react-native-vision-camera";
import { useImageLabeler } from "react-native-vision-camera-v3-image-labeling";

export function useCameraImageLabeler() {
    const { scanImage } = useImageLabeler({ minConfidence: 0.1 });

    return useFrameProcessor((frame) => {
        "worklet";

        const data = scanImage(frame);
        // console.log(data, "data");
    }, []);
}