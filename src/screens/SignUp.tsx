import {
  Button,
  Center,
  Heading,
  Image,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { ButtonComponent } from "@components/Button";
import Avatar from "@assets/avatar.png";
import { PencilSimpleLine } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

type FormDataProps = {
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  email: yup.string().required("Informe o e-mail!").email("Email inválido!"),
  phone: yup.string().required("Informe seu telefone!"),
  password: yup
    .string()
    .required("Informe a sua senha!")
    .min(6, "A senha tem que ter no mínimo 6 caracteres!"),
  password_confirm: yup
    .string()
    .required("Confirme a senha!")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere!"),
});

export function SignUp() {
  const navigation = useNavigation();
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<string>("");
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      password_confirm: "",
    },
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({
    email,
    phone,
    password,
    password_confirm,
  }: FormDataProps) {
    console.log({ email, phone, password, password_confirm });
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
        const { size }: any = await FileSystem.getInfoAsync(assets[0].uri);
        if (size && size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma imagem de até 5MB",
            placement: "top",
            bgColor: "red.100",
          });
        }
        setUserImage(assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
          {photoIsLoading ? (
            <Skeleton
              w="100"
              h="100"
              rounded="full"
              startColor="gray.300"
              endColor="gray.500"
            />
          ) : (
            <>
              <Image
                source={userImage.length === 0 ? Avatar : { uri: userImage }}
                defaultSource={Avatar}
                alt="avatar do usuário"
                resizeMode="contain"
                rounded={"full"}
                borderWidth={3}
                w="88"
                h="88"
                borderColor="blue.200"
                position="absolute"
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
                onPress={handleChangeUserPhoto}
              >
                <PencilSimpleLine size={16} color="#F7F7F8" />
              </Button>
            </>
          )}
        </Center>

        <VStack space="4" mx="12">
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
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
                {errors.email.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
            {errors.phone?.message && (
              <Text
                color="red.100"
                fontSize="md"
                fontWeight="bold"
                fontFamily="body"
              >
                {errors.phone.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secure={true}
                  onChangeText={onChange}
                  value={value}
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
                {errors.password.message}
              </Text>
            )}
          </View>
          <View mb="4">
            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar Senha"
                  secure={true}
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />
            {errors.password_confirm?.message && (
              <Text
                color="red.100"
                fontSize="md"
                fontWeight="bold"
                fontFamily="body"
              >
                {errors.password_confirm.message}
              </Text>
            )}
          </View>

          <ButtonComponent
            title="Criar"
            variant="black"
            onPress={handleSubmit(handleSignUp)}
          />
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
          <ButtonComponent
            title="Ir para o login"
            variant="light"
            onPress={handleGoBack}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
