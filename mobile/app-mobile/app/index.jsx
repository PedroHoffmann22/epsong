import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FullStack() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');


    const router = useRouter()

    const conectar = async () => {
        if (!usuario || !senha) {
            alert('Preencha todos os campos');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/autenticacao/login/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: usuario,
                    senha: senha
                })
            });

            console.log(response)
            if (response.status === 404) {
                alert('Email não encontrado');
                return
            }
            if (response.status === 403) {
                alert('Senha incorreta');
                return
            }
            if (response.status === 200) {
                storeData(usuario)
                router.push('/Home')
            }


        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('email', value);
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/linear-icon-8/background-music-01.png' }}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>EP SONG</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Usuário"
                value={usuario}
                onChangeText={setUsuario}
                placeholderTextColor="#c4c4c4"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholderTextColor="#c4c4c4"
            />

            <Text style={styles.recoverPassword}>Recuperar senha</Text>

            <Pressable style={styles.button} onPress={conectar}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => { router.push('/cadastro') }}>
                <Text style={styles.createAccountText}>Criar cadastro</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#80c5cc',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    logoImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    logoText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 16,
    },
    recoverPassword: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'right',
        width: '80%',
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
    createAccountButton: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 16,
        color: '#000'
    },
});