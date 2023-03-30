import {
  HStack,
  IImageProps,
  Image,
  ScrollView,
  Text,
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
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ButtonComponent } from "@components/Button";
import AppIntroSlider from "react-native-app-intro-slider";

type AdDetailsProps = IImageProps;

type slideProps = {
  item: {
    key: string;
    image: string;
  };
};

const slides = [
  {
    key: "1",
    image:
      "https://blog.bikeregistrada.com.br/wp-content/uploads/2020/10/escolherotamanhodabicicleta-1.jpeg",
  },
  {
    key: "2",
    image:
      "https://blog.bikeregistrada.com.br/wp-content/uploads/2020/10/escolherotamanhodabicicleta-1.jpeg",
  },
  {
    key: "3",
    image:
      "https://blog.bikeregistrada.com.br/wp-content/uploads/2020/10/escolherotamanhodabicicleta-1.jpeg",
  },
];

export function AnnouncementDetails({ ...rest }: AdDetailsProps) {
  const [type, setType] = useState<string>("new");
  const [acceptExchange, setAcceptExchange] = useState<boolean>(false);
  const navigation = useNavigation();

  function handleReturnNavigation() {
    navigation.goBack();
  }

  function renderSlides({ item }: slideProps) {
    return (
      <Image
        alt="imagem do item"
        source={{ uri: `${item.image}` }}
        width="full"
        height="full"
        style={{
          resizeMode: "cover",
        }}
      />
    );
  }

  return (
    <VStack flex={1} bgColor="gray.600">
      <TouchableOpacity
        style={{ marginTop: 36, marginLeft: 24, marginBottom: 12 }}
        onPress={handleReturnNavigation}
      >
        <ArrowLeft size={24} color="#1A181B" />
      </TouchableOpacity>
      <View width="full" height="280">
        <AppIntroSlider
          renderItem={renderSlides}
          data={slides}
          nextLabel=""
          doneLabel=""
          dotStyle={{
            backgroundColor: "#F7F7F8",
            opacity: 0.5,
            width: 121,
            height: 3,
            marginBottom: -70,
          }}
          activeDotStyle={{
            backgroundColor: "#F7F7F8",
            width: 121,
            height: 3,
            marginBottom: -70,
          }}
        />
      </View>
      <ScrollView>
        <HStack alignItems="center" space={"2"} mt="5" mx="6">
          <Image
            {...rest}
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
          w="43"
          rounded="full"
          bgColor={type === "new" ? "blue.100" : "gray.200"}
        >
          <Text color="#FFFFFF" fontSize="10" fontWeight="bold">
            {type === "new" ? "NOVO" : "USADO"}
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
            Bicicleta
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
            120,00
          </Text>
        </HStack>
        <Text mx="6" mb="6" fontSize="sm" color="gray.200" fontFamily="body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          atque quisquam nemo unde laborum ex eveniet minima praesentium?
          Asperiores commodi, voluptatum quos laborum error quasi nam est ea
          dignissimos recusandae.
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
            {acceptExchange ? "Sim" : "Não"}
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
        {/*aqui vamos fazer uma iteração com o array que possui os modos de pagamento*/}
        <HStack mx="6" alignItems="center" space="2">
          <Barcode size={18} color="#1A181B" />
          <Text color="gray.200" fontSize="sm" fontFamily="body">
            Boleto
          </Text>
        </HStack>
        <HStack mx="6" alignItems="center" space="2">
          <QrCode size={18} color="#1A181B" />
          <Text color="gray.200" fontSize="sm" fontFamily="body">
            Pix
          </Text>
        </HStack>
        <HStack mx="6" alignItems="center" space="2">
          <Money size={18} color="#1A181B" />
          <Text color="gray.200" fontSize="sm" fontFamily="body">
            Dinheiro
          </Text>
        </HStack>
        <HStack mx="6" alignItems="center" space="2">
          <CreditCard size={18} color="#1A181B" />
          <Text color="gray.200" fontSize="sm" fontFamily="body">
            Cartão de Crédito
          </Text>
        </HStack>
        <HStack mx="6" alignItems="center" space="2">
          <Bank size={18} color="#1A181B" />
          <Text color="gray.200" fontSize="sm" fontFamily="body">
            Depósito Bancário
          </Text>
        </HStack>
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
            120,00
          </Text>
          <ButtonComponent title="Entrar em contato" variant="blue">
            <WhatsappLogo weight="fill" color="#EDECEE" size="16" />
          </ButtonComponent>
        </HStack>
      </ScrollView>
    </VStack>
  );
}
