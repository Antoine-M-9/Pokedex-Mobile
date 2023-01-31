import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { ContextSettings, contextSettings } from "../context";
import { Pokemon } from "./Pokemon";

const width = Dimensions.get('window').width;

export const Pokemons = ({ navigation }) => {

    const [input, setInput] = useState('');
    const [pokemons, setPokemons] = useState([]);

    const { offset, limit } = useContext(ContextSettings);

    useEffect(() => {
        const controller = new AbortController()
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, { signal: controller.signal})
        .then(res => res.json())
        .then(data => setPokemons(data.results))
        .catch(err => console.log(err));
      return () => controller.abort()
    }, [offset, limit])

    return (
      <LinearGradient
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#3EECAC", "#EE74E1"]}
      >
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={setInput}
          value={input}
        />
        <FlatList
          style={styles.flatlist}
          data={pokemons.filter((p) => p.name.includes(input.toLowerCase()))}
          keyExtractor={(item, index) => item.url.split("/")[6]}
          renderItem={({ item, index }) => (
            <Pokemon nav={navigation} item={item} />
          )}
        />
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    flexDirection: "column",
    padding: 20,
    borderRadius: 10,
    width: width,
  },
  item: {
    textAlign: "center",
    marginVertical: 8
  },
  input: {
    padding: 5,
    fontSize: 15,
    borderWidth: 3,
    borderBottomColor: "white",
    borderColor: 'transparent',
    textAlign: "center",
    width,
    // shadowOffset: { width: -2, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 20,
  },
});