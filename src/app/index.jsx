import { useEffect, useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function Index() {
  const camera = useRef(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    Camera.requestCameraPermission().then((permission) =>
      setHasPermission(permission === "granted")
    );
  }, []);

  useEffect(() => {
    async function getPhotos() {
      // Busca várias fotos, nesse caso de 10 em 10 já com paginação embutida
      const gallery = await CameraRoll.getPhotos({
        first: 10,
        groupName: "MobileCameraContextualizada", // É importante usar um nome de álbum igual o usado no `CameraRoll.saveAsset` na hora de tirar uma foto pq se não ele pega todas as fotos do celular da pessoa
      });

      // `gallery.page_info` tem as informações de paginação.
      // `gallery.edges` é o resultado da busca, as fotos em si. Dentro de cada Edge tem os metadados do arquivo, e em `node.image` tem os metadados da foto em si, tamanho do arquivo, largura e altura em pixels, filepath e filename e a url que dá pra usar no componente Image
      setPhotos(gallery.edges.map((photo) => photo.node.image.uri));
    }

    getPhotos();
  }, []);

  const devices = useCameraDevices();
  const device = devices[0];

  async function takePhoto() {
    if (!camera.current) return;

    // usa a referência ao componente da Câmera do VisionCamera para bater uma foto e salva as informações na variável
    const photo = await camera.current.takePhoto();

    // Usa a biblioteca CameraRoll para salvar a foto na galeria
    await CameraRoll.saveAsset(`file://${photo.path}`, {
      type: "photo",
      album: "MobileCameraContextualizada",
    });

    // Faz uma requisição e retorna os dados de uma foto já armazenada na galeria
    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    const imageURI = URL.createObjectURL(data); // dá pra usar direto no componente Image no `source.uri` como exemplificado abaixo
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {!hasPermission && <Text>No Camera Permission.</Text>}
      {hasPermission && device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          ref={camera}
          photo={true}
          isActive={true}
          device={device}
        />
      )}

      <Button title="Tirar Foto" onPress={takePhoto} />

      {photos.map((photo) => (
        <Image
          key={photo}
          source={{ uri: photo }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
