import {
  Center,
  Image,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import Logo from "@assets/logo.svg";
import Marketspace from "@assets/marketspace.png";
import { Input } from "@components/Input";
import { ButtonComponent } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import axios from "axios";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
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

  return (
    <ScrollView bgColor="gray.700" flex={1}>
      <VStack
        flex={1}
        bgColor="gray.600"
        height={600}
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
          <View>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Informe o email!" }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            {errors.email?.message && (
              <Text
                color="red.100"
                fontSize="md"
                fontWeight="bold"
                fontFamily="body"
              >
                {errors.email?.message}
              </Text>
            )}
          </View>
          <View mb="4">
            <Controller
              control={control}
              name="password"
              rules={{ required: "Informe a senha!" }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha"
                  secure={true}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            {errors.password?.message && (
              <Text
                color="red.100"
                fontSize="md"
                fontWeight="bold"
                fontFamily="body"
              >
                {errors.password?.message}
              </Text>
            )}
          </View>

          <ButtonComponent
            title="Entrar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
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
