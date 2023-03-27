import { View, StatusBar } from "react-native";
import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";
import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

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
        {fontsLoaded ? <SignUp /> : <Loading />}
      </View>
    </NativeBaseProvider>
  );
}
