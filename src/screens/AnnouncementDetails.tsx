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
import { Dimensions, TouchableOpacity } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
import { ButtonComponent } from "@components/Button";

type AdDetailsProps = IImageProps;

export function AnnouncementDetails({ ...rest }: AdDetailsProps) {
  const [type, setType] = useState();
  const [acceptExchange, setAcceptExchange] = useState<boolean>(true);
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;

  function handleReturnNavigation() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <TouchableOpacity onPress={handleReturnNavigation}>
        <ArrowLeft />
      </TouchableOpacity>
      {/*<Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
          </View>
        )}
          />*/}
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
