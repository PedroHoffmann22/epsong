import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const route = useRouter()

  const button = () => {
    route.push('/Perfil')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EP SONG</Text>
      
      <TouchableOpacity style={styles.profileButton} onPress={button}>
        <Text style={styles.profileText}>Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Mais escutados da semana</Text>
      
      <View style={styles.circleContainer}>
        <Image style={styles.circleImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/0/08/Wiz_Khalifa_Feat._Charlie_Puth_-_See_You_Again_%28Official_Single_Cover%29.png' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://i.scdn.co/image/ab67616d00001e021525e8f82f2404738ca519c7' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://br.web.img3.acsta.net/pictures/21/04/16/19/40/0908165.jpg' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://i.ytimg.com/vi/PRlASZD3A9o/maxresdefault.jpg' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://i.ytimg.com/vi/U_EdVYhL1zw/sddefault.jpg' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://extra.globo.com/incoming/1581810-8fe-d6f/w448/velozesefuriosos.jpg' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://m.media-amazon.com/images/M/MV5BYjYzYTM0NzctMmUzOC00ZTU4LThhMzYtODVlNjgwZGZkMjMyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://i.ytimg.com/vi/jVTgpDkNTHU/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCuY3Dz5FhJTEabXhojVR9PGD11Ag' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://i.ytimg.com/vi/X7rdg_tKzKQ/maxresdefault.jpg' }} />
        <Image style={styles.circleImage} source={{ uri: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8b/1b/e7/8b1be7e6-2aa9-1be3-0e5d-c6c9b4d1cc02/198342360118_cover.jpg/1200x1200bf-60.jpg' }} />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar"
        placeholderTextColor="#777"
      />

      <Text style={styles.sectionTitle}>Escutados recentemente</Text>
      
      <View style={styles.recentContainer}>
        <View style={styles.recentItem}>
          <Image style={styles.circleBlackImage} source={{ uri: 'https://whiplash.net/imagens_promo_22/raulseixas_krigha.jpg' }} />
          <Text style={styles.songText}>Metamorfose Ambulante</Text>
        </View>
        <View style={styles.recentItem}>
          <Image style={styles.circleBlackImage} source={{ uri: 'https://br.web.img2.acsta.net/medias/nmedia/18/90/72/01/20109974.jpg' }} />
          <Text style={styles.songText}>Fuscão preto</Text>
        </View>
        <View style={styles.recentItem}>
          <Image style={styles.circleBlackImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/pt/a/a2/O_Menino_da_Porteira_%282009%29_-_Cartaz.jpg' }} />
          <Text style={styles.songText}>Menino da porteira</Text>
        </View>
        <View style={styles.recentItem}>
          <Image style={styles.circleBlackImage} source={{ uri: 'https://i.ytimg.com/vi/Rg0TJn_t7nE/maxresdefault.jpg' }} />
          <Text style={styles.songText}>Casa amarela</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#85CAD0',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 50,
    padding: 10,
  },
  profileText: {
    fontSize: 16,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  circleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 5,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  recentContainer: {
    backgroundColor: '#ffff',
    padding: 15,
    borderRadius: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  circleBlackImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  songText: {
    fontSize: 16,
    color: '#000',
  },
});