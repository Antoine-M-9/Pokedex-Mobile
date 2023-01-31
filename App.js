import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text} from 'react-native';
import { Detail } from './src/components/Detail';
import { Pokemons } from './src/components/Pokemons';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from 'react';
import { ContextSettings } from './src/context';
import { Settings } from './src/components/Settings';

const stack = createNativeStackNavigator();

export default function App() {

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(151);

  return (
    <ContextSettings.Provider value={{offset, setOffset, limit, setLimit}}>
      <NavigationContainer>
        <stack.Navigator>
            <stack.Screen
              name="Home"
              component={Pokemons}
              options={({ navigation }) => ({
                headerRight: () => (
                  <FontAwesome
                    size={23}
                    name="gear"
                    onPress={() => navigation.navigate('Settings')}
                  ></FontAwesome>
                ),
              })}
            />
            <stack.Screen
              name="Detail"
              component={Detail}
              options={({ route }) => ({
                title:
                  route.params.item.name[0].toUpperCase() +
                  route.params.item.name.substring(1),
                headerTitleStyle: {
                  fontWeight: "bold",
                  textTransform: "capitalize",
                },
              })}
            />
            <stack.Screen
              name="Settings"
              component={Settings}
            />
        </stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ContextSettings.Provider>
  );
}