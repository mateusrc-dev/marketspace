import { HStack, Image, Text, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { ButtonComponent } from "./Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesPropsTwo } from "@routes/app.routes";

type HeaderProps = {
  type?: "homeHeader" | "Olá";
};

export function Header({ type = "homeHeader" }: HeaderProps) {
  const navigation = useNavigation<AppNavigatorRoutesPropsTwo>();

  function handleNavigationCreateAd() {
    navigation.navigate("createAd")
  }

  if (type === "homeHeader") {
    return (
      <HStack alignItems="center" px={6} pt={9} justifyContent="space-between">
        <HStack alignItems="center" space="2.5">
          <Image
            source={{ uri: "https://github.com/mateusrc-dev.png" }}
            alt="imagem do usuário"
            rounded="full"
            resizeMode="contain"
            w={10}
            h={10}
            borderWidth="2"
            borderColor="blue.200"
          />
          <VStack>
            <Text fontFamily="body" fontSize="md" color="gray.100">
              Boas vindas,{" "}
            </Text>
            <Text
              fontWeight="bold"
              fontFamily="body"
              fontSize="md"
              color="gray.100"
            >
              Mateus!
            </Text>
          </VStack>
        </HStack>
        <ButtonComponent title="Criar anúncio" variant="black" onPress={handleNavigationCreateAd}>
          <Plus weight="regular" color="#EDECEE" size={16} />
        </ButtonComponent>
      </HStack>
    );
  } else {
    return <Text>Olá</Text>;
  }
}
