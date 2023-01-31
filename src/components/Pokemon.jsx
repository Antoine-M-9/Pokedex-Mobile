import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Pokemon = ({ nav, item }) => {
    
    const index = item.url.split('/')[6];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`

    return (
      <TouchableOpacity onPress={() => nav.navigate('Detail', {item})}>
        <View style={styles.container}>
          <View>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
          <Text style={{ textTransform: 'capitalize', fontWeight: 'bold'}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: 150,
        resizeMode: 'contain'
    },
    name: {

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        marginVertical: 10,
        borderRadius: 10
    }
})