import { HStack, IImageProps, Image, Text, View, VStack } from "native-base";
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
  const [type, setType] = useState();
  const [acceptExchange, setAcceptExchange] = useState<boolean>(true);
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
    <VStack flex={1}>
      <TouchableOpacity onPress={handleReturnNavigation}>
        <ArrowLeft />
      </TouchableOpacity>
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
      <HStack>
        <Image
          {...rest}
          source={{ uri: "https://github.com/mateusrc-dev.png" }}
          alt="avatar do usuário"
          position="absolute"
          rounded="full"
          borderWidth="1"
          borderColor="gray.700"
          resizeMode="contain"
          w={6}
          h={6}
          top="1"
          left="1"
        />
        <Text>Mateus Carvalho</Text>
      </HStack>
      <View rounded="full" bgColor={type === "new" ? "blue.100" : "gray.200"}>
        <Text color="#FFFFFF" fontSize="10" fontWeight="bold">
          {type === "new" ? "NOVO" : "USADO"}
        </Text>
      </View>
      <HStack>
        <Text fontFamily="heading">Bicicleta</Text>
        <Text>
          <Text>R$</Text>120,00
        </Text>
      </HStack>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
        atque quisquam nemo unde laborum ex eveniet minima praesentium?
        Asperiores commodi, voluptatum quos laborum error quasi nam est ea
        dignissimos recusandae. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Reiciendis nihil eaque nobis voluptatibus aspernatur.
        Temporibus consectetur qui corporis minus ducimus, ipsam dignissimos,
        quos sunt suscipit totam deserunt amet alias aliquam?
      </Text>
      <HStack>
        <Text>Aceita troca?</Text>
        <Text>{acceptExchange ? "Sim" : "Não"}</Text>
      </HStack>
      <Text>Meios de pagamento:</Text>
      {/*aqui vamos fazer uma iteração com o array que possui os modos de pagamento*/}
      <HStack>
        <Barcode size={18} />
        <Text>Boleto</Text>
      </HStack>
      <HStack>
        <QrCode size={18} />
        <Text>Pix</Text>
      </HStack>
      <HStack>
        <Money size={18} />
        <Text>Dinheiro</Text>
      </HStack>
      <HStack>
        <CreditCard size={18} />
        <Text>Cartão de Crédito</Text>
      </HStack>
      <HStack>
        <Bank size={18} />
        <Text>Depósito Bancário</Text>
      </HStack>
      <HStack>
        <Text>
          <Text>R$</Text>120,00
        </Text>
        <ButtonComponent title="Entrar em contato" variant="blue">
          <WhatsappLogo />
        </ButtonComponent>
      </HStack>
    </VStack>
  );
}
