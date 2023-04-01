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
} from "native-base";
import { ArrowLeft, Plus } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { ButtonComponent } from "@components/Button";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function CreateAd() {
  const [photoIsLoading, setPhotoisLoading] = useState();
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
          <HStack px={6} flexWrap={"wrap"} space={"1.5"} mt="4" mb="8">
            <Image
              source={{
                uri: "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg",
              }}
              alt="imagem do produto"
              w="100"
              h="100"
              rounded="6"
              resizeMode="cover"
            />
            {photoIsLoading ? (
              <Skeleton
                w="100"
                h="100"
                rounded="6"
                startColor="gray.300"
                endColor="gray.400"
              />
            ) : (
              <TouchableOpacity>
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
            )}
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
          <Input purchase={true} mx={6} placeholder="Valor do produto" />
          <Text>Aceita troca?</Text>
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
          <HStack justifyContent="space-between">
            <ButtonComponent title="Cancelar" variant="light" />
            <ButtonComponent title="Avançar" variant="black" />
          </HStack>
        </ScrollView>
      </View>
    </VStack>
  );
}
