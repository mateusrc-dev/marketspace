import { View, StatusBar } from "react-native";
import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";
import { Routes } from "@routes/index";
import { AuthContext } from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_700Bold,
    Karla_400Regular,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <View
        style={{
          flex: 1,
        }}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthContext.Provider
          value={{
            id: "1",
            name: "Mateus",
            email: "mateus@email.com",
            avatar: "mateus.png",
          }}
        >
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContext.Provider>
      </View>
    </NativeBaseProvider>
  );
}
