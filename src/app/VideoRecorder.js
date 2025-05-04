import React, { useRef, useState, useEffect } from 'react';
import { View, Button, StyleSheet, Video, Platform, TouchableOpacity, Text, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Video as ExpoVideo } from 'expo-av';cd caminho/do/seu/projeto

export default function VideoRecorder() {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      setHasMediaPermission(mediaStatus.status === 'granted');
    })();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video.uri);
      const asset = await MediaLibrary.createAssetAsync(video.uri);
      Alert.alert('Sucesso', 'Vídeo salvo na galeria!');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  if (hasCameraPermission === null || hasMediaPermission === null) {
    return <View><Text>Solicitando permissões...</Text></View>;
  }

  if (hasCameraPermission === false || hasMediaPermission === false) {
    return <View><Text>Permissões negadas.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.controls}>
        <Button title={isRecording ? "Gravando..." : "Gravar Vídeo"} onPress={startRecording} disabled={isRecording} />
        <Button title="Parar Gravação" onPress={stopRecording} disabled={!isRecording} />
        <Button title="Abrir Vídeo da Galeria" onPress={pickVideo} />
      </View>
      {videoUri && (
        <ExpoVideo
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 3,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  video: {
    flex: 2,
    marginTop: 10,
  },
});
