import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function GalleryItem({ uri }) {
  const router = useRouter();

  return (
    <TouchableOpacity>
      <Image source={{ uri }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});