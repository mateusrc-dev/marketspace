import {
  Actionsheet,
  Checkbox,
  HStack,
  Text,
  useDisclose,
  View,
  VStack,
  Switch,
  useToast,
  FlatList,
} from "native-base";
import { Header } from "@components/Header";
import { ArrowRight, Tag, X, XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  AppNavigatorRoutesProps,
  AppNavigatorRoutesPropsTwo,
} from "@routes/app.routes";
import { Input } from "@components/Input";
import { Ad } from "@components/Ad";
import { useCallback, useState } from "react";
import { ButtonComponent } from "@components/Button";
import axios from "axios";
import { api } from "@services/api";
import { Loading } from "@components/Loading";
import { ProductsDTO } from "@dtos/ProductsDTO";

export function Home() {
  const [conditionState, setConditionState] = useState<
    true | false | undefined
  >();
  const [groupValues, setGroupValues] = useState<string[]>([
    "pix",
    "boleto",
    "cash",
    "card",
    "deposit",
  ]);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [productsUsers, setProductsUsers] = useState<ProductsDTO[]>([]);
  const [productsUser, setProductsUser] = useState<ProductsDTO[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const navigationApp = useNavigation<AppNavigatorRoutesPropsTwo>();
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclose();

  function handleNavigationMyAds() {
    navigation.navigate("myAds");
  }

  function handleConditionNew() {
    if (conditionState === true) {
      setConditionState(undefined);
    } else {
      setConditionState(true);
    }
  }

  function handleConditionUsed() {
    if (conditionState === false) {
      setConditionState(undefined);
    } else {
      setConditionState(false);
    }
  }

  function handleNavigationAdDetails(id: string) {
    navigationApp.navigate("adDetails", { id });
  }

  async function useSearchInFetch() {
    try {
      setIsLoading(true);
      const response = await api.get("/products", {
        params: {
          query,
        },
      });
      setProductsUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show({
          title: error.response?.data.message,
          placement: "top",
          bgColor: "red.100",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function useFilterInFetch() {
    try {
      onClose();
      setIsLoading(true);
      const response = await api.get("/products", {
        params: {
          is_new: conditionState,
          accept_trade: switchValue,
          payment_methods: groupValues,
        },
      });
      setProductsUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show({
          title: error.response?.data.message,
          placement: "top",
          bgColor: "red.100",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  function resetFilters() {
    setConditionState(undefined);
    setGroupValues(["pix", "boleto", "cash", "card", "deposit"]);
    setSwitchValue(false);
  }

  async function fetchUserProducts() {
    try {
      setIsLoading(true);
      const response = await api.get("/users/products");
      setProductsUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show({
          title: error.response?.data.message,
          placement: "top",
          bgColor: "red.100",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProducts() {
    try {
      onClose();
      resetFilters();
      setIsLoading(true);
      const response = await api.get(`/products`);
      setProductsUsers(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show({
          title: error.response?.data.message,
          placement: "top",
          bgColor: "red.100",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
      fetchUserProducts();
    }, [])
  );

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
              {productsUser.length}
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
          handleSearch={useSearchInFetch}
          onChangeText={(e) => setQuery(e)}
          value={query}
        />
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={productsUsers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          px={6}
          mt={6}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigationAdDetails(item.id)}
            >
              <Ad
                userAvatar={item.user.avatar}
                nameAd={item.name}
                price={item.price}
                type={item.is_new === true ? "new" : "used"}
                imagePath={item.product_images[0].path}
              />
            </TouchableOpacity>
          )}
        />
      )}

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
                  bgColor={conditionState === true ? "blue.200" : "gray.500"}
                  py="1.5"
                  px="4"
                  rounded="full"
                  alignItems="center"
                  space="1.5"
                >
                  <Text
                    color={conditionState === false ? "#FFFFFF" : "gray.300"}
                    fontSize="xs"
                    fontFamily="body"
                    fontWeight="bold"
                  >
                    NOVO
                  </Text>
                  {conditionState === true && (
                    <XCircle size={16} weight="fill" color="#EDECEE" />
                  )}
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConditionUsed}>
                <HStack
                  bgColor={conditionState === false ? "blue.200" : "gray.500"}
                  py="1.5"
                  px="4"
                  rounded="full"
                  alignItems="center"
                  space="1.5"
                >
                  <Text
                    color={conditionState === false ? "#FFFFFF" : "gray.300"}
                    fontSize="xs"
                    fontFamily="body"
                    fontWeight="bold"
                  >
                    USADO
                  </Text>
                  {conditionState === false && (
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
              isChecked={switchValue}
              onValueChange={(value) => setSwitchValue(value)}
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
                <Checkbox
                  value="boleto"
                  accessibilityLabel="boleto"
                  colorScheme="info"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Boleto
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox
                  value="pix"
                  accessibilityLabel="pix"
                  colorScheme="info"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Pix
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox
                  value="cash"
                  accessibilityLabel="dinheiro"
                  colorScheme="info"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Dinheiro
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox
                  value="card"
                  accessibilityLabel="cartão de crédito"
                  colorScheme="info"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Cartão de Crédito
                </Text>
              </HStack>
              <HStack mb={1} space={2}>
                <Checkbox
                  value="deposit"
                  accessibilityLabel="depósito bancário"
                  colorScheme="info"
                />
                <Text fontSize="md" color="gray.200" fontFamily="body">
                  Depósito Bancário
                </Text>
              </HStack>
            </Checkbox.Group>
            <HStack justifyContent="space-between">
              <ButtonComponent
                title="Resetar filtros"
                variant="light"
                onPress={fetchProducts}
              />
              <ButtonComponent
                title="Aplicar filtros"
                variant="black"
                onPress={useFilterInFetch}
              />
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}
