import {
  FlatList,
  HStack,
  IImageProps,
  Image,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  WhatsappLogo,
} from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ButtonComponent } from "@components/Button";
import { Dimensions } from "react-native";
import { api } from "@services/api";
import axios from "axios";
import { ProductDTO } from "@dtos/ProductDTO";
import { Loading } from "@components/Loading";

type AdDetailsProps = IImageProps;

type RoutesParamsProps = {
  id: string;
};

export function AnnouncementDetails({ ...rest }: AdDetailsProps) {
  const [productImage, setProductImage] = useState<
    { id: string; path: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductDTO>();
  const [userAvatar, setUserAvatar] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const route = useRoute();
  const { id } = route.params as RoutesParamsProps;
  const toast = useToast();

  function handleReturnNavigation() {
    navigation.goBack();
  }

  async function fetchDetailsProduct() {
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
    fetchDetailsProduct();
  }, []);

  return (
    <VStack flex={1} bgColor="gray.600">
      <TouchableOpacity
        style={{ marginTop: 36, marginLeft: 24, marginBottom: 12 }}
        onPress={handleReturnNavigation}
      >
        <ArrowLeft size={24} color="#1A181B" />
      </TouchableOpacity>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
          </View>
          <ScrollView>
            <HStack alignItems="center" space={"2"} mt="5" mx="6">
              {userAvatar.length !== 0 && (
                <Image
                  {...rest}
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
              )}
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
                {productDetails?.accept_trade ? "Sim" : "Não"}
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
            <HStack
              px="6"
              width="full"
              mt="7"
              h="90"
              bgColor="gray.700"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                color="blue.200"
                fontSize="xl"
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
              <ButtonComponent title="Entrar em contato" variant="blue">
                <WhatsappLogo weight="fill" color="#EDECEE" size="16" />
              </ButtonComponent>
            </HStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}
