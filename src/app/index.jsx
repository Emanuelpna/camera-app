import { useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import GalleryButton from "../components/galleryButton";

export default function Index() {
  const camera = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    Camera.requestCameraPermission().then((permission) => setHasPermission(permission === "granted"));
  }, []);

  useEffect(() => {
    async function getPhotos() {
      const gallery = await CameraRoll.getPhotos({ first: 10, groupName: "MobileCameraContextualizada" });
      setPhotos(gallery.edges.map((photo) => photo.node.image.uri));
    }
    getPhotos();
  }, []);

  const devices = useCameraDevices();
  const device = devices[0];

  async function takePhoto() {
    if (!camera.current) return;

    const photo = await camera.current.takePhoto();
    await CameraRoll.saveAsset(`file://${photo.path}`, { type: "photo", album: "MobileCameraContextualizada" });

    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    const imageURI = URL.createObjectURL(data);
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {!hasPermission && <Text>No Camera Permission.</Text>}
      {hasPermission && device != null && (
        <Camera style={StyleSheet.absoluteFill} ref={camera} photo={true} isActive={true} device={device} />
      )}

      <Button title="Tirar Foto" onPress={takePhoto} />

      {photos.map((photo) => (
        <Image key={photo} source={{ uri: photo }} style={{ height: 200, width: null, flex: 1 }} />
      ))}

      <GalleryButton />
    </View>
  );
}