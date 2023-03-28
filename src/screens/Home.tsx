import { HStack, Text, View, VStack } from "native-base";
import { Header } from "@components/Header";
import { ArrowRight, Tag, X, XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Input } from "@components/Input";
import { Ad } from "@components/Ad";
import ImageTest from "@assets/imageTest.png";
import { useState } from "react";

export function Home() {
  const [state, setState] = useState<boolean>(false);
  const [conditionState, setConditionState] = useState<"new" | "used" | "">("");
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  console.log(state);

  function handleNavigationMyAds() {
    navigation.navigate("myAds");
  }

  function handleStateFilter() {
    if (state === true) {
      setState(false);
    } else if (state === false) {
      setState(true);
    }
  }

  function handleConditionNew() {
    if (conditionState === "new") {
      setConditionState("")
    } else {
    setConditionState("new");
  }
  }

  function handleConditionUsed() {
    if (conditionState === "used") {
      setConditionState("")
    } else {
    setConditionState("used");
  }
  }

  return (
    <VStack flex={1} bgColor="gray.600">
      <Header type="homeHeader" />
      <Text
        px={6}
        color="gray.300"
        fontSize="sm"
        fontFamily="body"
        mt="8"
        mb="2"
      >
        Seus produtos anunciados para a venda
      </Text>
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
      <Text
        px={6}
        color="gray.300"
        fontSize="sm"
        fontFamily="body"
        mt="8"
        mb="3"
      >
        Compre produtos variados
      </Text>
      <View px={6}>
        <Input
          placeholder="Buscar anúncio"
          search={true}
          handleStateFilter={handleStateFilter}
        />
      </View>
      <HStack px={6} flexWrap={"wrap"} space="2" mt="6">
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
        <Ad
          userAvatar="https://github.com/mateusrc-dev.png"
          nameAd="pudim de ovo"
          price="100"
          type="new"
          imagePath={ImageTest}
        />
      </HStack>
      {state && (
        <VStack>
          <HStack>
            <Text>Filtrar anúncios</Text>
            <X />
          </HStack>
          <Text>Condição</Text>
          <HStack space="2">
            <TouchableOpacity onPress={handleConditionNew}>
              <HStack
                bgColor={conditionState === "new" ? "blue.200" : "gray.500"}
                py="1.5"
                px="4"
                rounded="full"
                alignItems="center"
                space="1.5"
              >
                <Text
                  color={conditionState === "new" ? "#FFFFFF" : "gray.300"}
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="bold"
                >
                  NOVO
                </Text>
                {conditionState === "new" && (
                  <XCircle size={16} weight="bold" color="#EDECEE" />
                )}
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConditionUsed}>
              <HStack
                bgColor={conditionState === "used" ? "blue.200" : "gray.500"}
                py="1.5"
                px="4"
                rounded="full"
                alignItems="center"
                space="1.5"
              >
                <Text
                  color={conditionState === "used" ? "#FFFFFF" : "gray.300"}
                  fontSize="xs"
                  fontFamily="body"
                  fontWeight="bold"
                >
                  USADO
                </Text>
                {conditionState === "used" && (
                  <XCircle size={16} weight="fill" color="#EDECEE"  />
                )}
              </HStack>
            </TouchableOpacity>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
}
