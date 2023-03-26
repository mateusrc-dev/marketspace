import { Center, Image, Text, View, VStack } from "native-base";
import Logo from "@assets/logo.svg";
import Marketspace from "@assets/marketspace.png";
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <VStack flex={1} bgColor="gray.600">
      <Center mt="16" mb="20">
        <View mb="3">
          <Logo />
        </View>
        <Image
          source={Marketspace}
          alt="logo marketspace"
          resizeMode="contain"
        />
        <Text fontFamily="body" color="gray.300" fontSize="sm">
          Seu espaço de compra e venda
        </Text>
      </Center>

      <Text
        textAlign="center"
        fontFamily="body"
        color="gray.200"
        fontSize="sm"
        mb="4"
      >
        Acesse sua conta
      </Text>
      <VStack space="4" mx="12">
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" secureTextEntry />
      </VStack>
    </VStack>
  );
}
