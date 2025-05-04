import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function GalleryButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.galleryButton} onPress={() => router.push("../Screens/galleryScreen")}>
      <Text style={styles.buttonText}>Galeria</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  galleryButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});