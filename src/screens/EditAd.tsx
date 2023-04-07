import {
  HStack,
  Text,
  VStack,
  View,
  Skeleton,
  Image,
  Radio,
  Switch,
  Checkbox,
  FlatList,
  Button,
  useToast,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  Plus,
  QrCode,
  Tag,
  X,
} from "phosphor-react-native";
import { Dimensions, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ButtonComponent } from "@components/Button";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { api } from "@services/api";
import axios from "axios";
import { Loading } from "@components/Loading";
import {
  AppNavigatorRoutesProps,
  AppNavigatorRoutesPropsTwo,
} from "@routes/app.routes";
import * as FileSystem from "expo-file-system";

type RoutesParamsProps = {
  id: string;
};

export function EditAd() {
  const [productImageApi, setProductImageApi] = useState<
    { id: string; path: string }[]
  >([]);
  const [productImage, setProductImage] = useState<string[]>([]);
  const [productImageSend, setProductImageSend] = useState<string[]>([]);
  const [productImagesIds, setProductImageId] = useState<
    { id: string; path: string }[]
  >([]);
  const [groupValuesApi, setGroupValuesApi] = useState<
    { key: string; name: string }[]
  >([]);
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [value, setValue] = useState<string | undefined>(undefined);
  const [groupValues, setGroupValues] = useState<string[]>([]);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [changePage, setChangePage] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get("window");
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const { id } = route.params as RoutesParamsProps;
  console.log(productImage);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleChangeUserPhoto() {
    try {
      setPhotoIsLoading(true);
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (canceled) {
        return;
      }

      if (assets[0].uri) {
        const { size }: any = await FileSystem.getInfoAsync(assets[0].uri);
        if (size && size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma imagem de até 5MB",
            placement: "top",
            bgColor: "red.100",
          });
        }
        setProductImage((prevState) => [...prevState, assets[0].uri]);
        setProductImageSend((prevState) => [...prevState, assets[0].uri]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleDeleteProductImage(productDelete: string) {
    const productsSendWithoutProductDeleted = productImageSend.filter(
      (product) => product !== productDelete
    );
    const productsWithoutProductDeleted: string[] = productImage.filter(
      (product) => product !== productDelete
    );
    const productsIdDeleted: { id: string; path: string }[] =
      productImageApi.filter((product) => product.path === productDelete);
    console.log(productsIdDeleted);
    setProductImage(productsWithoutProductDeleted);
    setProductImageSend(productsSendWithoutProductDeleted);
    if (productsIdDeleted.length !== 0) {
      setProductImageId((prevState) => [...prevState, productsIdDeleted[0]]);
    }
  }

  async function onChangePageVisualization() {
    if (changePage === false) {
      setChangePage(true);
    } else {
      setChangePage(false);
    }
  }

  async function deleteImages() {
    let imagesId = [];
    for (let i = 0; productImagesIds.length > i; i += 1) {
      imagesId.push(productImagesIds[i].id);
    }
    if (productImagesIds.length !== 0) {
      await api.delete("/products/images", {
        data: { productImagesIds: imagesId },
      });
      console.log("imagens deletadas!");
    }
  }

  async function addNewImages() {
    try {
      let photo1;
      let photo2;
      let photo3;
      if (productImageSend[0]) {
        const fileExtension = productImageSend[0].split(".").pop(); // for get the extension of image
        photo1 = {
          // we let's defined information to image need have for do upload
          name: `${userName}.${fileExtension}`
            .toLowerCase()
            .replaceAll(" ", ""),
          uri: productImageSend[0], // uri say the locale of image in device of user
          type: `image/${fileExtension}`,
        } as any;
      }

      if (productImageSend[1]) {
        const fileExtension = productImageSend[1].split(".").pop(); // for get the extension of image
        photo2 = {
          // we let's defined information to image need have for do upload
          name: `${userName}.${fileExtension}`
            .toLowerCase()
            .replaceAll(" ", ""),
          uri: productImageSend[1], // uri say the locale of image in device of user
          type: `image/${fileExtension}`,
        } as any;
      }

      if (productImageSend[2]) {
        const fileExtension = productImageSend[2].split(".").pop(); // for get the extension of image
        photo3 = {
          // we let's defined information to image need have for do upload
          name: `${userName}.${fileExtension}`
            .toLowerCase()
            .replaceAll(" ", ""),
          uri: productImageSend[2], // uri say the locale of image in device of user
          type: `image/${fileExtension}`,
        } as any;
      }

      const productImagesUploadForm = new FormData();
      productImagesUploadForm.append("product_id", id);
      productImageSend[0] && productImagesUploadForm.append("images", photo1);
      productImageSend[1] && productImagesUploadForm.append("images", photo2);
      productImageSend[2] && productImagesUploadForm.append("images", photo3);
      console.log("cheguei aqui");
      await api.post("/products/images", productImagesUploadForm, {
        headers: { "Content-type": "multipart/form-data" },
      });
      console.log("imagens adicionadas");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show({
          title: error.response?.data.message,
          placement: "top",
          bgColor: "red.100",
        });
      }
    }
  }

  async function handleUpdateAd() {
    if (
      title.length === 0 &&
      description.length === 0 &&
      productImageApi.length === 0 &&
      value?.length === 0 &&
      groupValues.length === 0
    ) {
      Alert.alert(
        "Você não preencheu todos os campos, garanta que todos estejam preenchidos e escolha pelo menos uma imagem!"
      );
      return;
    }
    try {
      setIsLoading(true);
      await deleteImages();
      const is_new = value === "used" ? true : false;
      const Price = Number(price);
      await api.put(`/products/${id}`, {
        name: title,
        description,
        is_new,
        accept_trade: switchValue,
        payment_methods: groupValues,
        price: Price,
      });

      if (productImageSend.length !== 0) {
        await addNewImages();
      }

      Alert.alert("Produto atualizado com sucesso");
      navigation.navigate("myAds");
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

  async function fetchDetailsProductUser() {
    try {
      setIsLoading(true);
      const response = await api.get(`/products/${id}`);
      setProductImageApi(response.data.product_images);
      setSwitchValue(response.data.accept_trade);
      setUserAvatar(response.data.user.avatar);
      setUserName(response.data.user.name);
      setGroupValuesApi(response.data.payment_methods);
      setValue(response.data.is_new === true ? "new" : "used");
      setTitle(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
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

  useEffect(() => {
    function handleGroupsProduct() {
      let methods = [];
      for (let i = 0; groupValuesApi.length > i; i += 1) {
        methods.push(groupValuesApi[i].key);
      }
      setGroupValues(methods);
    }
    handleGroupsProduct();
  }, [groupValuesApi]);

  useEffect(() => {
    function handleImagesProduct() {
      let images = [];
      for (let i = 0; productImageApi.length > i; i += 1) {
        images.push(productImageApi[i].path);
      }
      setProductImage(images);
    }
    handleImagesProduct();
  }, [productImageApi]);

  return (
    <>
      {!changePage ? (
        <VStack flex={1} bgColor="gray.600">
          <HStack alignItems="center" mt="9" justifyContent="center">
            <View position="absolute" left="6">
              <TouchableOpacity onPress={handleGoBack}>
                <ArrowLeft size={24} color="#1A181B" />
              </TouchableOpacity>
            </View>
            <Text fontFamily="heading" fontSize="lg" color="gray.100">
              Editar anúncio
            </Text>
            <View />
          </HStack>
          {isLoading ? (
            <Loading />
          ) : (
            <View style={{ flex: 1 }}>
              <ScrollView>
                <Text
                  mt="6"
                  mb="1"
                  px={6}
                  color="gray.200"
                  fontSize="md"
                  fontWeight="bold"
                  fontFamily="body"
                >
                  Imagens
                </Text>
                <Text px={6} color="gray.300" fontSize="md" fontFamily="body">
                  Escolha até 3 imagens para mostrar o quanto o seu produto é
                  incrível!
                </Text>
                <HStack px={6} mt="4" mb="8">
                  <FlatList
                    data={productImage}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={() => (
                      <View>
                        {photoIsLoading ? (
                          <Skeleton
                            w="100"
                            h="100"
                            rounded="6"
                            startColor="gray.300"
                            endColor="gray.500"
                          />
                        ) : (
                          productImage.length < 3 && (
                            <TouchableOpacity onPress={handleChangeUserPhoto}>
                              <View
                                alignItems="center"
                                justifyContent="center"
                                bgColor="gray.500"
                                w="100"
                                h="100"
                                rounded="6"
                              >
                                <Plus size="24" color="#9F9BA1" />
                              </View>
                            </TouchableOpacity>
                          )
                        )}
                      </View>
                    )}
                    renderItem={({ item }) => (
                      <View position="relative">
                        <Image
                          source={
                            item.includes("/ImagePicker/")
                              ? { uri: item }
                              : {
                                  uri: `${api.defaults.baseURL}/images/${item}`,
                                }
                          }
                          alt="imagem do produto"
                          w="100"
                          h="100"
                          rounded="6"
                          resizeMode="cover"
                          mr={1.5}
                        />
                        <Button
                          position="absolute"
                          alignItems="center"
                          h="4"
                          w="4"
                          bgColor="gray.200"
                          justifyContent="center"
                          top="1"
                          right="2.5"
                          rounded="full"
                          p={0}
                          _pressed={{ bg: "gray.400" }}
                          onPress={() => handleDeleteProductImage(item)}
                        >
                          <X size="12" color="#F7F7F8" />
                        </Button>
                      </View>
                    )}
                  />
                </HStack>
                <Text
                  mb="4"
                  px={6}
                  color="gray.200"
                  fontSize="md"
                  fontWeight="bold"
                  fontFamily="body"
                >
                  Sobre o produto
                </Text>
                <Input
                  mx="6"
                  mb="4"
                  placeholder="Título do anúncio"
                  onChangeText={(e) => setTitle(e)}
                  value={title}
                />
                <TextArea
                  mx="6"
                  mb={4}
                  placeholder="Descrição do produto"
                  onChangeText={(e: any) => setDescription(e)}
                  value={description}
                />
                <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="product new or used"
                  value={value}
                  onChange={(nextValue) => setValue(nextValue)}
                  px={6}
                  mb="8"
                >
                  <HStack space={"5"}>
                    <Radio
                      value={"new"}
                      color={"gray.200"}
                      fontSize="md"
                      fontFamily="body"
                      colorScheme="blue"
                    >
                      Produto novo
                    </Radio>
                    <Radio
                      value={"used"}
                      color={"gray.200"}
                      fontSize="md"
                      fontFamily="body"
                      colorScheme="blue"
                    >
                      Produto usado
                    </Radio>
                  </HStack>
                </Radio.Group>
                <Text
                  mb="4"
                  px={6}
                  color="gray.200"
                  fontSize="md"
                  fontWeight="bold"
                  fontFamily="body"
                >
                  Venda
                </Text>
                <Input
                  purchase={true}
                  mx={6}
                  mb="4"
                  placeholder="Valor do produto"
                  value={String(price)}
                  onChangeText={(e) => setPrice(e)}
                />
                <Text
                  px={6}
                  color="gray.200"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="body"
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
                  ml={8}
                />
                <Text
                  px={6}
                  color="gray.200"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="body"
                  mb={3}
                >
                  Meios de pagamento aceito
                </Text>
                <Checkbox.Group
                  onChange={setGroupValues}
                  value={groupValues}
                  accessibilityLabel="type pay"
                  px={6}
                >
                  <HStack mb={1} space={2}>
                    <Checkbox
                      value="boleto"
                      accessibilityLabel="boleto"
                      colorScheme="blue"
                    />
                    <Text fontSize="md" color="gray.200" fontFamily="body">
                      Boleto
                    </Text>
                  </HStack>
                  <HStack mb={1} space={2}>
                    <Checkbox
                      value="pix"
                      accessibilityLabel="pix"
                      colorScheme="blue"
                    />
                    <Text fontSize="md" color="gray.200" fontFamily="body">
                      Pix
                    </Text>
                  </HStack>
                  <HStack mb={1} space={2}>
                    <Checkbox
                      value="cash"
                      accessibilityLabel="dinheiro"
                      colorScheme="blue"
                    />
                    <Text fontSize="md" color="gray.200" fontFamily="body">
                      Dinheiro
                    </Text>
                  </HStack>
                  <HStack mb={1} space={2}>
                    <Checkbox
                      value="card"
                      accessibilityLabel="cartão de crédito"
                      colorScheme="blue"
                    />
                    <Text fontSize="md" color="gray.200" fontFamily="body">
                      Cartão de Crédito
                    </Text>
                  </HStack>
                  <HStack mb={1} space={2}>
                    <Checkbox
                      value="deposit"
                      accessibilityLabel="depósito bancário"
                      colorScheme="blue"
                    />
                    <Text fontSize="md" color="gray.200" fontFamily="body">
                      Depósito Bancário
                    </Text>
                  </HStack>
                </Checkbox.Group>
                <HStack
                  justifyContent="space-between"
                  px={6}
                  py={5}
                  bgColor="gray.700"
                  mt="8"
                >
                  <ButtonComponent
                    title="Cancelar"
                    variant="light"
                    onPress={handleGoBack}
                  />
                  <ButtonComponent
                    title="Avançar"
                    variant="black"
                    onPress={onChangePageVisualization}
                  />
                </HStack>
              </ScrollView>
            </View>
          )}
        </VStack>
      ) : (
        <VStack flex={1} bgColor="gray.600">
          <VStack
            bgColor="blue.200"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              mt="9"
              mb="0.5"
              fontWeight="bold"
              color="gray.700"
              fontFamily="body"
              fontSize="md"
            >
              Pré visualização do anúncio
            </Text>
            <Text mb="4" color="gray.700" fontFamily="body" fontSize="sm">
              É assim que o produto vai aparecer!
            </Text>
          </VStack>
          <View width="full" height="280" position="relative">
            <FlatList
              data={productImage}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Image
                  alt="imagem do item"
                  source={
                    item.includes("/ImagePicker/")
                      ? { uri: item }
                      : {
                          uri: `${api.defaults.baseURL}/images/${item}`,
                        }
                  }
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
                  {userName}
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
                bgColor={value === "new" ? "blue.100" : "gray.200"}
              >
                <Text color="#FFFFFF" fontSize="10" fontWeight="bold">
                  {value === "new" ? "NOVO" : "USADO"}
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
                  {title}
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
                  {price}
                </Text>
              </HStack>
              <Text
                mx="6"
                mb="6"
                fontSize="sm"
                color="gray.200"
                fontFamily="body"
              >
                {description}
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
                  {switchValue === true ? "Sim" : "Não"}
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
              {groupValues?.map(
                (item) =>
                  item === "boleto" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <Barcode size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Boleto
                      </Text>
                    </HStack>
                  )
              )}
              {groupValues?.map(
                (item) =>
                  item === "pix" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <QrCode size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Pix
                      </Text>
                    </HStack>
                  )
              )}
              {groupValues?.map(
                (item) =>
                  item === "cash" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <Money size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Dinheiro
                      </Text>
                    </HStack>
                  )
              )}
              {groupValues?.map(
                (item) =>
                  item === "card" && (
                    <HStack mx="6" alignItems="center" space="2">
                      <CreditCard size={18} color="#1A181B" />
                      <Text color="gray.200" fontSize="sm" fontFamily="body">
                        Cartão de Crédito
                      </Text>
                    </HStack>
                  )
              )}
              {groupValues?.map(
                (item) =>
                  item === "deposit" && (
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
          <HStack
            pt="5"
            pb="7"
            bgColor="gray.700"
            mt="auto"
            px={6}
            justifyContent="space-between"
          >
            <ButtonComponent
              title="Voltar e editar"
              variant="light"
              onPress={onChangePageVisualization}
            >
              <ArrowLeft color="#3E3A40" size="16" />
            </ButtonComponent>
            <ButtonComponent
              title="Atualizar"
              variant="blue"
              onPress={handleUpdateAd}
              isLoading={isLoading}
            >
              <Tag color="#EDECEE" size="16" />
            </ButtonComponent>
          </HStack>
        </VStack>
      )}
    </>
  );
}
