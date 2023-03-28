import { HStack, Text, VStack } from "native-base";
import { Header } from "@components/Header";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigationMyAds() {
    navigation.navigate("myAds");
  }

  return (
    <VStack flex={1} bgColor="gray.600">
      <Header type="homeHeader" />
      <Text px={6}>Seus produtos anunciados para a venda</Text>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        bgColor="blue.300"
        h="66"
        w="full"
        px={6}
      >
        <HStack alignItems="center" space={4}>
          <Tag size="22" weight="regular" color="#364D9D" />
          <VStack>
            <Text
              color="gray.200"
              fontWeight="bold"
              fontSize="lg"
              fontFamily="body"
            >
              4
            </Text>
            <Text
              color="gray.200"
              fontWeight="regular"
              fontSize="xs"
              fontFamily="body"
            >
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity onPress={handleNavigationMyAds}>
          <HStack alignItems="center" space="2">
            <Text
              color="blue.100"
              fontWeight="bold"
              fontSize="xs"
              fontFamily="body"
            >
              Meus anúncios
            </Text>
            <ArrowRight color="#364D9D" size="16" />
          </HStack>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
