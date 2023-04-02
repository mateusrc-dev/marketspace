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
import { Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ButtonComponent } from "@components/Button";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const { width } = Dimensions.get("window");

export function CreateAd() {
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [groupValues, setGroupValues] = useState<string[] | undefined>();
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [changePage, setChangePage] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const navigation = useNavigation();
  const toast = useToast();

  function handleSwitchValue() {
    setSwitchValue((prevState) => !prevState);
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleChangeProductPhoto() {
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleDeleteProductImage(productDelete: string) {
    const productsWithoutProductDeleted = productImage.filter(
      (product) => product !== productDelete
    );
    setProductImage(productsWithoutProductDeleted);
  }

  function onChangePageVisualization() {
    if (changePage === false) {
      setChangePage(true);
    } else {
      setChangePage(false);
    }
  }

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
              Criar anúncio
            </Text>
            <View />
          </HStack>
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
                          <TouchableOpacity onPress={handleChangeProductPhoto}>
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
                        source={{
                          uri: `${item}`,
                        }}
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
                    value="new"
                    color={"gray.200"}
                    fontSize="md"
                    fontFamily="body"
                    colorScheme="blue"
                  >
                    Produto novo
                  </Radio>
                  <Radio
                    value="used"
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
                onChangeText={(e) => setPrice(e)}
                value={price}
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
                value={switchValue}
                onValueChange={handleSwitchValue}
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
                    value="dinheiro"
                    accessibilityLabel="dinheiro"
                    colorScheme="blue"
                  />
                  <Text fontSize="md" color="gray.200" fontFamily="body">
                    Dinheiro
                  </Text>
                </HStack>
                <HStack mb={1} space={2}>
                  <Checkbox
                    value="cartão de crédito"
                    accessibilityLabel="cartão de crédito"
                    colorScheme="blue"
                  />
                  <Text fontSize="md" color="gray.200" fontFamily="body">
                    Cartão de Crédito
                  </Text>
                </HStack>
                <HStack mb={1} space={2}>
                  <Checkbox
                    value="depósito bancário"
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
                <ButtonComponent title="Cancelar" variant="light" />
                <ButtonComponent
                  title="Avançar"
                  variant="black"
                  onPress={onChangePageVisualization}
                />
              </HStack>
            </ScrollView>
          </View>
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
                  source={{ uri: `${item}` }}
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
                  source={{ uri: "https://github.com/mateusrc-dev.png" }}
                  alt="avatar do usuário"
                  rounded="full"
                  borderWidth="2"
                  borderColor="blue.200"
                  resizeMode="contain"
                  w={6}
                  h={6}
                />
                <Text color="gray.100" fontSize="sm" fontFamily="body">
                  Mateus Carvalho
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
                  item === "dinheiro" && (
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
                  item === "cartão de crédito" && (
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
                  item === "depósito bancário" && (
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
              title="Publicar"
              variant="blue"
              onPress={onChangePageVisualization}
            >
              <Tag color="#EDECEE" size="16" />
            </ButtonComponent>
          </HStack>
        </VStack>
      )}
    </>
  );
}
