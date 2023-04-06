import { ButtonComponent } from "@components/Button";
import { Loading } from "@components/Loading";
import { ProductDTO } from "@dtos/ProductDTO";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AppNavigatorRoutesProps,
  AppNavigatorRoutesPropsTwo,
} from "@routes/app.routes";
import { api } from "@services/api";
import axios from "axios";
import {
  HStack,
  Text,
  VStack,
  FlatList,
  View,
  Image,
  ScrollView,
  useToast,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  PencilSimpleLine,
  Plus,
  Power,
  QrCode,
  Trash,
} from "phosphor-react-native";
import { useState, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";

type RoutesParamsProps = {
  id: string;
};

export function MyAdDetails() {
  const [productImage, setProductImage] = useState<
    { id: string; path: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductDTO>();
  const [userAvatar, setUserAvatar] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const navigationApp = useNavigation<AppNavigatorRoutesPropsTwo>();
  const toast = useToast();
  const route = useRoute();
  const { id } = route.params as RoutesParamsProps;

  function handleReturn() {
    navigation.goBack();
  }

  function handleNavigationEditAd() {
    navigationApp.navigate("editAd", { id });
  }

  async function handleChangeActiveAd() {
    try {
      setIsLoading(true);
      if (productDetails?.is_active === false) {
        await api.patch(`/products/${id}`, { is_active: true });
      } else {
        await api.patch(`/products/${id}`, { is_active: false });
      }
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
      fetchDetailsProductUser();
    }
  }

  async function fetchDetailsProductUser() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${id}`);
      setProductDetails(response.data);
      setProductImage(response.data.product_images);
      setUserAvatar(response.data.user.avatar);
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

  useEffect(() => {
    fetchDetailsProductUser();
  }, []);

  return (
    <VStack flex={1} bgColor="gray.600">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mt="9"
        mb="3"
        px={6}
      >
        <TouchableOpacity onPress={handleReturn}>
          <ArrowLeft size="24" color="#1A181B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationEditAd}>
          <PencilSimpleLine size="24" color="#1A181B" />
        </TouchableOpacity>
      </HStack>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView>
            <View width="full" height="280" position="relative">
              <FlatList
                data={productImage}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Image
                    alt="imagem do item"
                    source={{
                      uri: `${api.defaults.baseURL}/images/${item.path}`,
                    }}
                    width={width}
                    height="280"
                    resizeMode="cover"
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={(e) => {
                  const x = e.nativeEvent.contentOffset.x;
                  setCurrentIndex(Number((x / width).toFixed(0)));
                }}
              />
              <HStack
                w="full"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                bottom="0.5"
                px={"0.5"}
                space={"1"}
              >
                {productImage.map((item, index) => {
                  return (
                    <View
                      flex={1}
                      minHeight="1"
                      maxHeight="1"
                      rounded="full"
                      bgColor="gray.700"
                      opacity={currentIndex === index ? "0.75" : "0.5"}
                    ></View>
                  );
                })}
              </HStack>
              {!productDetails?.is_active && (
                <View
                  width="full"
                  height="280"
                  position="absolute"
                  opacity="0.5"
                  bgColor="#000000"
                  alignItems="center"
                  justifyContent="center"
                />
              )}
              {!productDetails?.is_active && (
                <Text
                  color="gray.700"
                  fontWeight="bold"
                  fontFamily="body"
                  fontSize="sm"
                  position="absolute"
                  top="131"
                  left="110"
                >
                  ANÚNCIO DESATIVADO
                </Text>
              )}
            </View>

            <VStack>
              <HStack alignItems="center" space={"2"} mt="5" mx="6">
                <Image
                  source={{
                    uri: `${api.defaults.baseURL}/images/${userAvatar}`,
                  }}
                  alt="avatar do usuário"
                  rounded="full"
                  borderWidth="2"
                  borderColor="blue.200"
                  resizeMode="contain"
                  w={6}
                  h={6}
                />
                <Text color="gray.100" fontSize="sm" fontFamily="body">
                  {productDetails?.user.name}
                </Text>
              </HStack>
              <View
                mx="6"
                mt="6"
                mb="2"
                px="2"
                py="0.5"
                w="50"
                rounded="full"
                bgColor={
                  productDetails?.is_new === true ? "blue.100" : "gray.200"
                }
              >
                <Text color="#FFFFFF" fontSize="10" fontWeight="bold">
                  {productDetails?.is_new === true ? "NOVO" : "USADO"}
                </Text>
              </View>
              <HStack
                mx="6"
                alignItems="center"
                justifyContent="space-between"
                mb="2"
              >
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                  fontWeight="bold"
                  color="gray.100"
                >
                  {productDetails?.name}
                </Text>
                <Text
                  color="blue.200"
                  fontSize="lg"
                  fontWeight="bold"
                  fontFamily="body"
                >
                  <Text
                    color="blue.200"
                    fontSize="sm"
                    fontWeight="bold"
                    fontFamily="body"
                  >
                    R$
                  </Text>
                  {productDetails?.price}
                </Text>
              </HStack>
              <Text
                mx="6"
                mb="6"
                fontSize="sm"
                color="gray.200"
                fontFamily="body"
              >
                {productDetails?.description}
              </Text>
              <HStack mx="6" alignItems="center" space="2" mb="4">
                <Text
                  color="gray.200"
                  fontWeight="bold"
                  fontFamily="body"
                  fontSize="sm"
                >
                  Aceita troca?
                </Text>
                <Text color="gray.200" fontFamily="body" fontSize="sm">
                  {productDetails?.accept_trade === true ? "Sim" : "Não"}
                </Text>
              </HStack>
              <Text
                mx="6"
                color="gray.200"
                fontWeight="bold"
                fontFamily="body"
                fontSize="sm"
                mb="2"
              >
                Meios de pagamento:
              </Text>
              {productDetails?.payment_methods?.map(
                (item) =>
                  item.key === "boleto" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <Barcode size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Boleto
                      </Text>
                    </HStack>
                  )
              )}
              {productDetails?.payment_methods?.map(
                (item) =>
                  item.key === "pix" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <QrCode size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Pix
                      </Text>
                    </HStack>
                  )
              )}
              {productDetails?.payment_methods?.map(
                (item) =>
                  item.key === "cash" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <Money size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Dinheiro
                      </Text>
                    </HStack>
                  )
              )}
              {productDetails?.payment_methods?.map(
                (item) =>
                  item.key === "card" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <CreditCard size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Cartão de Crédito
                      </Text>
                    </HStack>
                  )
              )}
              {productDetails?.payment_methods?.map(
                (item) =>
                  item.key === "deposit" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <Bank size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Depósito Bancário
                      </Text>
                    </HStack>
                  )
              )}
            </VStack>
          </ScrollView>

          <VStack
            pt="5"
            pb="7"
            bgColor="gray.700"
            mt="auto"
            px={6}
            justifyContent="space-between"
          >
            {!productDetails?.is_active ? (
              <ButtonComponent
                title="Reativar anúncio"
                variant="blue"
                mb="2"
                onPress={handleChangeActiveAd}
              >
                <Power size="16" color="#EDECEE" />
              </ButtonComponent>
            ) : (
              <ButtonComponent
                title="Desativar anúncio"
                variant="black"
                mb="2"
                onPress={handleChangeActiveAd}
              >
                <Power size="16" color="#EDECEE" />
              </ButtonComponent>
            )}
            <ButtonComponent title="Excluir anúncio" variant="light">
              <Trash size="16" color="#5F5B62" />
            </ButtonComponent>
          </VStack>
        </>
      )}
    </VStack>
  );
}
