import { TouchableOpacity, Image } from "react-native";
import styles from "../styles/galleryStyles";
import { useRouter } from "expo-router";

export default function GalleryItem({ uri }) {
  const router = useRouter();

  return (
    <TouchableOpacity>
      <Image source={{ uri }} style={styles.image} />
    </TouchableOpacity>
  );
}
