import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text } from "react-native"
import { Colors } from "../colors";

export const Detail = ({ route }) => {

    const { item } = route.params
    const [pokemon, setPokemon] = useState([]);
    const [colors, setColors] = useState(["#FFF", "#DDD"]);
    const image = pokemon.sprites?.other?.["official-artwork"]?.front_default;

    useEffect(() => {
        fetch(`${item.url}`)
            .then(res => res.json())
            .then(data => {
                const colors = data.types.map(item => Colors[item.type.name])
                if (colors.length === 1) colors.push(colors[0])
                setColors(colors)
                setPokemon(data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1}}
        colors={colors}
      >
        <Text style={styles.h1}>{item.name}</Text>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <FlatList
          style={styles.list}
          data={pokemon.types}
          key={(item) => item.name}
          renderItem={({ item }) => (
            <Text
              style={[
                styles.listText,
                { backgroundColor: Colors[item?.type?.name] },
              ]}
            >
              {item?.type?.name}
            </Text>
          )}
        />
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 30,
    margin: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },

  list: {
    display: "flex",
    backgroundColor: "lavender",
    flexDirection: "column",
    padding: 10,
    width: 200,
    borderRadius: 10,
  },

  listText: {
    display: "flex",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    borderWidth: 3,
    borderColor: "white",
  },

  image: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },

  h1: {
    fontSize: 25,
  },
});