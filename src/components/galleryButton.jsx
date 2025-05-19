import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/galleryButtonStyles";

export default function GalleryButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.galleryButton} onPress={() => router.push("../Screens/galleryScreen")}>
      <Text style={styles.galleryButtonText}>Galeria</Text>
    </TouchableOpacity>
  );
}