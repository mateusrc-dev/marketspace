import {
  Button,
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { ButtonComponent } from "@components/Button";
import Avatar from "@assets/avatar.png";
import { PencilSimpleLine } from "phosphor-react-native";

export function SignUp() {
  return (
    <ScrollView flex={1} bgColor="gray.600">
      <VStack>
        <Center mt="5" mb="8">
          <View mb="3">
            <Logo width={60} height={60} />
          </View>
          <Heading color="gray.100" fontSize="lg" fontFamily="heading">
            Boas vindas!
          </Heading>
          <Text
            fontFamily="body"
            color="gray.200"
            fontSize="sm"
            textAlign="center"
            mx="12"
          >
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos.
          </Text>
        </Center>

        <Center mb="4" w={88} h={88} position="relative" mx="auto">
          <Image
            source={Avatar}
            alt="avatar do usuário"
            resizeMode="contain"
            rounded="full"
            borderWidth={3}
            borderColor="blue.200"
          />
          <Button
            position="absolute"
            bottom="0"
            right="0"
            rounded="full"
            bgColor="blue.200"
            w={10}
            h={10}
            alignItems="center"
            justifyContent="center"
            _pressed={{ bg: "blue.100" }}
          >
            <PencilSimpleLine size={16} color="#F7F7F8" />
          </Button>
        </Center>

        <VStack space="4" mx="12">
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Telefone" keyboardType="phone-pad" />
          <Input placeholder="Senha" secure={true} />
          <Input placeholder="Confirmar Senha" secure={true} mb="4" />
          <ButtonComponent title="Criar" variant="black" />
        </VStack>
        <VStack mx="12" mb="12" mt="12">
          <Text
            textAlign="center"
            fontFamily="body"
            color="gray.200"
            fontSize="sm"
            mb="4"
          >
            Já tem uma conta?
          </Text>
          <ButtonComponent title="Ir para o login" variant="light" />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
