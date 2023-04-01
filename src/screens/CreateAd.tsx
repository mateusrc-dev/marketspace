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
} from "native-base";
import { ArrowLeft, Plus, X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ButtonComponent } from "@components/Button";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export function CreateAd() {
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [groupValues, setGroupValues] = useState<string[] | undefined>();
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const navigation = useNavigation();

  function handleSwitchValue() {
    setSwitchValue((prevState) => !prevState);
  }

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

  return (
    <VStack flex={1} bgColor="gray.600">
      <HStack alignItems="center" mt="9" justifyContent="center">
        <View position="absolute" left="6">
          <TouchableOpacity onPress={handleGoBack}>
            <ArrowLeft size={24} color="#1A181B" />
          </TouchableOpacity>
        </View>
        <Text fontFamily="heading" fontSize="lg" color="gray.100">
          Meus anúncios
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
          <Input mx="6" mb="4" placeholder="Título do anúncio" />
          <TextArea mx="6" mb={4} placeholder="Descrição do produto" />
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
          <Input purchase={true} mx={6} mb="4" placeholder="Valor do produto" />
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
            <ButtonComponent title="Avançar" variant="black" />
          </HStack>
        </ScrollView>
      </View>
    </VStack>
  );
}
