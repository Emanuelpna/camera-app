import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import GalleryItem from "../components/galleryItem";
import styles from "../styles/galleryStyles";

export default function GalleryScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function getPhotos() {
      const gallery = await CameraRoll.getPhotos({
        first: 20,
        groupName: "MobileCameraContextualizada",
      });

      setPhotos(gallery.edges.map((photo) => photo.node.image.uri));
    }

    getPhotos();
  }, []);

  return (
    <View style={styles.container}>
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <GalleryItem uri={item} />}
          numColumns={3}
        />
      ) : (
        <Text style={styles.noPhotos}>Nenhuma foto encontrada.</Text>
      )}
    </View>
  );
}
