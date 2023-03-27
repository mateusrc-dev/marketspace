import { Center, Image, ScrollView, Text, View, VStack } from "native-base";
import Logo from "@assets/logo.svg";
import Marketspace from "@assets/marketspace.png";
import { Input } from "@components/Input";
import { ButtonComponent } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView bgColor="gray.700" flex={1}>
      <VStack
        flex={1}
        bgColor="gray.600"
        height={556}
        roundedBottomLeft={24}
        roundedBottomRight={24}
      >
        <Center mt="16" mb="20">
          <View mb="3">
            <Logo />
          </View>
          <Image
            source={Marketspace}
            defaultSource={Marketspace}
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
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secure={true} mb="4" />
          <ButtonComponent title="Entrar" />
        </VStack>
      </VStack>
      <VStack mx="12" mb="12" mt="12">
        <Text
          textAlign="center"
          fontFamily="body"
          color="gray.200"
          fontSize="sm"
          mb="4"
        >
          Ainda não tem acesso?
        </Text>
        <ButtonComponent
          title="Criar uma conta"
          variant="light"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  );
}
