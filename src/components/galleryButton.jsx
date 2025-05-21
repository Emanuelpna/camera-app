import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/galleryStyles";

export default function GalleryButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.galleryButton}
      onPress={() => router.push("/gallery")}
    >
      <Text style={styles.galleryButtonText}>Galeria</Text>
    </TouchableOpacity>
  );
}
