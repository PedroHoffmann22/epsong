import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);


  const handleSendImage = async () => {
    if (!profileImage) {
      Alert.alert("Nenhuma imagem selecionada", "Por favor, selecione uma imagem antes de salvar.");
      return;
    }

    try {
      const data = {
        "file": profileImage,
        "upload_preset": 'ml_default'
      };
      const res = await fetch('https://api.cloudinary.com/v1_1/dm9hni2cj/upload', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
      const result = await res.json();
      setProfileImage(result.url);
      // Aqui você pode adicionar a lógica para atualizar as informações do usuário, se necessário
      // await saveNewImageURLonBackend(result);
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para alterar a foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EP SONG</Text>

      <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require('../../assets/images/icon.png') 
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSendImage} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar Imagem</Text>
      </TouchableOpacity>

      <Text style={styles.userInfo}>name</Text>
      <Text style={styles.userInfo}>email</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85CAD0',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userInfo: {
    fontSize: 18,
    color: '#000',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});