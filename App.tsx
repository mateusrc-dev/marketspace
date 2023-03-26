import { Text, View } from "react-native";
import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from "@expo-google-fonts/karla";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_700Bold,
    Karla_400Regular,
  });

  return (
    <View>
      {fontsLoaded ? <Text>Hello World!</Text> : <Text>Carregando...</Text>}
    </View>
  );
}
