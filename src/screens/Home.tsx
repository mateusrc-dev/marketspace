import {
  Actionsheet,
  Checkbox,
  HStack,
  ScrollView,
  Text,
  useDisclose,
  View,
  VStack,
  Switch,
} from "native-base";
import { Header } from "@components/Header";
import { ArrowRight, Tag, X, XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps, AppNavigatorRoutesPropsTwo } from "@routes/app.routes";
import { Input } from "@components/Input";
import { Ad } from "@components/Ad";
import { useState } from "react";
import { ButtonComponent } from "@components/Button";

export function Home() {
  const [conditionState, setConditionState] = useState<"new" | "used" | "">("");
  const [groupValues, setGroupValues] = useState<string[] | undefined>();
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const navigationApp = useNavigation<AppNavigatorRoutesPropsTwo>();

  const { isOpen, onClose, onOpen } = useDisclose();

  function handleNavigationMyAds() {
    navigation.navigate("myAds");
  }

  function handleConditionNew() {
    if (conditionState === "new") {
      setConditionState("");
    } else {
      setConditionState("new");
    }
  }

  function handleConditionUsed() {
    if (conditionState === "used") {
      setConditionState("");
    } else {
      setConditionState("used");
    }
  }

  function handleSwitchValue() {
    setSwitchValue((prevState) => !prevState);
  }

  function handleNavigationAdDetails() {
    navigationApp.navigate("adDetails");
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
          handleStateFilter={onOpen}
        />
      </View>
      <ScrollView>
        <HStack px={6} flexWrap={"wrap"} space={1.5} mt="6">
          <TouchableOpacity onPress={handleNavigationAdDetails}>
            <Ad
              userAvatar="https://github.com/mateusrc-dev.png"
              nameAd="pudim de ovo"
              price="100"
              type="new"
              imagePath={
                "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigationAdDetails}>
            <Ad
              userAvatar="https://github.com/mateusrc-dev.png"
              nameAd="pudim de ovo"
              price="100"
              type="new"
              imagePath={
                "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
              }
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigationAdDetails}>
            <Ad
              userAvatar="https://github.com/mateusrc-dev.png"
              nameAd="pudim de ovo"
              price="100"
              type="new"
              imagePath={
                "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
              }
            />
          </TouchableOpacity>
        </HStack>
      </ScrollView>

      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        accessibilityLabel="filter"
      >
        <Actionsheet.Content accessibilityLabel="filter">
          <VStack w="full" px={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text
                color="gray.100"
                fontSize="lg"
                fontWeight="bold"
                fontFamily="body"
              >
                Filtrar anúncios
              </Text>
              <TouchableOpacity onPress={onClose}>
                <X size="24" color="#9F9BA1" />
              </TouchableOpacity>
            </HStack>
            <Text
              color="gray.200"
              fontSize="sm"
              fontWeight="bold"
              fontFamily="body"
              mt={6}
              mb={3}
            >
              Condição
            </Text>
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
                    <XCircle size={16} weight="fill" color="#EDECEE" />
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
                    <XCircle size={16} weight="fill" color="#EDECEE" />
                  )}
                </HStack>
              </TouchableOpacity>
            </HStack>
            <Text
              color="gray.200"
              fontSize="sm"
              fontWeight="bold"
              fontFamily="body"
              mt={6}
              mb={3}
            >
              Aceita troca?
            </Text>

            <Switch
              accessibilityLabel="accept replacement"
              height={"8"}
              width={"10"}
              size="lg"
              value={switchValue}
              onValueChange={handleSwitchValue}
              trackColor={{ false: "#D9D8DA", true: "#647AC7" }}
              thumbColor={switchValue ? "#F7F7F8" : "#F7F7F8"}
              ios_backgroundColor="#3e3e3e"
            />

            <Text
              color="gray.200"
              fontSize="sm"
              fontWeight="bold"
              fontFamily="body"
              mt={3}
              mb={3}
            >
              Meios de pagamento aceito
            </Text>
            <Checkbox.Group
              onChange={setGroupValues}
              value={groupValues}
              accessibilityLabel="type pay"
            >
              <HStack mb={1} space={2}>
                <Checkbox value="boleto" accessibilityLabel="boleto" />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Boleto
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox value="pix" accessibilityLabel="pix" />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Pix
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox value="dinheiro" accessibilityLabel="dinheiro" />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Dinheiro
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox
                  value="cartão de crédito"
                  accessibilityLabel="cartão de crédito"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Cartão de Crédito
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox
                  value="depósito bancário"
                  accessibilityLabel="depósito bancário"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Depósito Bancário
                </Text>
              </HStack>
            </Checkbox.Group>
            <HStack justifyContent="space-between">
              <ButtonComponent title="Resetar filtros" variant="light" />
              <ButtonComponent title="Aplicar filtros" variant="black" />
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}
