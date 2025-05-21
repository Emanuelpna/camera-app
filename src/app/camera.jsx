import { useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

import GalleryButton from "../components/galleryButton";

export default function Index() {
  const camera = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [photos, setPhotos] = useState([]);

  const router = useRouter();

  useEffect(() => {
    Camera.requestCameraPermission().then((permission) =>
      setHasPermission(permission === "granted")
    );
  }, []);

  useEffect(() => {
    async function getPhotos() {
      const gallery = await CameraRoll.getPhotos({
        first: 10,
        groupName: "MobileCameraContextualizada",
      });
      setPhotos(gallery.edges.map((photo) => photo.node.image.uri));
    }
    getPhotos();
  }, []);

  const devices = useCameraDevices();
  const device = devices[0];

  async function takePhoto() {
    if (!camera.current) return;

    const photo = await camera.current.takePhoto();
    await CameraRoll.saveAsset(`file://${photo.path}`, {
      type: "photo",
      album: "MobileCameraContextualizada",
    });

    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    const imageURI = URL.createObjectURL(data);
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Button
        title="Identificar Alimentos"
        onPress={() => router.push("/camera")}
      />

      <GalleryButton />
    </View>
  );
}
