import { useContext } from "react"
import { View, Button } from "react-native";
import { ContextSettings } from "../context"

export const Settings = ({ navigation }) => {

    const { setLimit, setOffset } = useContext(ContextSettings);

    const update = ({offset, limit}) => {
        setOffset(offset)
        setLimit(limit)
        navigation.navigate('Home');
    }

    return (
        <View>
            <Button title="Première" onPress={() => update({offset: 0, limit: 151})}></Button>
            <Button title="Deuxième" onPress={() => update({offset: 151, limit: 251})}></Button>
        </View>
    )
}