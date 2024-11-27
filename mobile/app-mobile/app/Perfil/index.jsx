import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, Modal, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Perfil = () => {
    const [profileImage, setProfileImage] = useState();
    const [email, setEmail] = useState('');
    const [visibilidadeModal, setVisibilidadeModal] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const route = useRouter();

    useEffect(() => {
      getData()
    },[])

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
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
            handleSetImage(result.assets[0].uri);
        }
    };

    const handleSetImage = async (url) => {
        try {
            const data = { file: url, upload_preset: 'ml_default' };
            const res = await fetch('https://api.cloudinary.com/v1_1/dm9hni2cj/upload', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            saveImageInBackEnd(result.url);
        } catch (error) {
            console.error(error);
        }
    };

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('email');
        if (value !== null) {
         setEmail(value)
        }
      } catch (e) {
        console.log(e)
      }
    };
    const saveImageInBackEnd = async (url) => {
        try {
            await fetch(`http://localhost:8000/usuario/${email}/salvar_foto`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ foto: url }),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const trocarSenha = async () => {
        if (novaSenha.length < 2 || novaSenha !== confirmarNovaSenha) {
            Alert.alert("Erro", "As senhas não coincidem ou são muito curtas.");
            return;
        }

        try {
            await fetch(`http://localhost:8000/autenticacao/nova_senha/${email}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senha: novaSenha }),
            })
            .then((response) => console.log(response.status))
            
            fecharModal();
        } catch (error) {
            console.error(error);
        }
    };

    const fecharModal = () => {
        setNovaSenha('');
        setConfirmarNovaSenha('');
        setSecureTextEntry(true);
        setVisibilidadeModal(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EP SONG</Text>

            <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                <Image
                    source={profileImage ? { uri: profileImage } : require('../../assets/images/icon.png')}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <Text style={styles.userInfo}>nome</Text>
            <Text style={styles.userInfo}>{email}</Text>

            <TouchableOpacity onPress={() => setVisibilidadeModal(true)} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Mudar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => route.push('/')} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Desconectar</Text>
            </TouchableOpacity>

            <Modal visible={visibilidadeModal} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Alterar a Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nova Senha"
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry={secureTextEntry}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Nova Senha"
                            value={confirmarNovaSenha}
                            onChangeText={setConfirmarNovaSenha}
                            secureTextEntry={secureTextEntry}
                        />
                        <TouchableOpacity onPress={trocarSenha} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={fecharModal} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        color: '#000',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default Perfil;