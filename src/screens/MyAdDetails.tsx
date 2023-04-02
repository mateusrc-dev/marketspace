import { ButtonComponent } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import {
  AppNavigatorRoutesProps,
  AppNavigatorRoutesPropsTwo,
} from "@routes/app.routes";
import {
  HStack,
  Text,
  VStack,
  FlatList,
  View,
  Image,
  ScrollView,
} from "native-base";
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  PencilSimpleLine,
  Plus,
  Power,
  QrCode,
  Trash,
} from "phosphor-react-native";
import { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";

export function MyAdDetails() {
  const [productImage, setProductImage] = useState<string[]>([
    "https://blog.bikeregistrada.com.br/wp-content/uploads/2020/10/escolherotamanhodabicicleta-1.jpeg",
    "https://blog.bikeregistrada.com.br/wp-content/uploads/2020/10/escolherotamanhodabicicleta-1.jpeg",
    "https://blog.bikeregistrada.com.br/wp-content/uploads/2020/10/escolherotamanhodabicicleta-1.jpeg",
  ]);
  const [value, setValue] = useState("used");
  const [groupValues, setGroupValues] = useState<string[] | undefined>([
    "dinheiro",
    "pix",
    "boleto",
  ]);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState<ConstrainBoolean>(false);
  const { height, width } = Dimensions.get("window");
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const navigationApp = useNavigation<AppNavigatorRoutesPropsTwo>();

  function handleReturn() {
    navigation.goBack();
  }

  function handleNavigationEditAd() {
    navigationApp.navigate("editAd");
  }

  function handleChangeActiveAd() {
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.600">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mt="9"
        mb="3"
        px={6}
      >
        <TouchableOpacity onPress={handleReturn}>
          <ArrowLeft size="24" color="#1A181B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationEditAd}>
          <PencilSimpleLine size="24" color="#1A181B" />
        </TouchableOpacity>
      </HStack>
      <ScrollView>
        <View width="full" height="280" position="relative">
          <FlatList
            data={productImage}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Image
                alt="imagem do item"
                source={{ uri: `${item}` }}
                width={width}
                height="280"
                resizeMode="cover"
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex(Number((x / width).toFixed(0)));
            }}
          />
          <HStack
            w="full"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom="0.5"
            px={"0.5"}
            space={"1"}
          >
            {productImage.map((item, index) => {
              return (
                <View
                  flex={1}
                  minHeight="1"
                  maxHeight="1"
                  rounded="full"
                  bgColor="gray.700"
                  opacity={currentIndex === index ? "0.75" : "0.5"}
                ></View>
              );
            })}
          </HStack>
          {isActive && (
            <View
              width="full"
              height="280"
              position="absolute"
              opacity="0.5"
              bgColor="#000000"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                color="gray.700"
                fontWeight="bold"
                fontFamily="body"
                fontSize="sm"
              >
                ANÚNCIO DESATIVADO
              </Text>
            </View>
          )}
        </View>

        <VStack>
          <HStack alignItems="center" space={"2"} mt="5" mx="6">
            <Image
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
            w="50"
            rounded="full"
            bgColor={value === "new" ? "blue.100" : "gray.200"}
          >
            <Text color="#FFFFFF" fontSize="10" fontWeight="bold">
              {value === "new" ? "NOVO" : "USADO"}
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
              {switchValue === true ? "Sim" : "Não"}
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
          {groupValues?.map(
            (item) =>
              item === "boleto" && (
                <HStack mx="6" alignItems="center" space="2">
                  <Barcode size={18} color="#1A181B" />
                  <Text color="gray.200" fontSize="sm" fontFamily="body">
                    Boleto
                  </Text>
                </HStack>
              )
          )}
          {groupValues?.map(
            (item) =>
              item === "pix" && (
                <HStack mx="6" alignItems="center" space="2">
                  <QrCode size={18} color="#1A181B" />
                  <Text color="gray.200" fontSize="sm" fontFamily="body">
                    Pix
                  </Text>
                </HStack>
              )
          )}
          {groupValues?.map(
            (item) =>
              item === "dinheiro" && (
                <HStack mx="6" alignItems="center" space="2">
                  <Money size={18} color="#1A181B" />
                  <Text color="gray.200" fontSize="sm" fontFamily="body">
                    Dinheiro
                  </Text>
                </HStack>
              )
          )}
          {groupValues?.map(
            (item) =>
              item === "cartão de crédito" && (
                <HStack mx="6" alignItems="center" space="2">
                  <CreditCard size={18} color="#1A181B" />
                  <Text color="gray.200" fontSize="sm" fontFamily="body">
                    Cartão de Crédito
                  </Text>
                </HStack>
              )
          )}
          {groupValues?.map(
            (item) =>
              item === "depósito bancário" && (
                <HStack mx="6" alignItems="center" space="2">
                  <Bank size={18} color="#1A181B" />
                  <Text color="gray.200" fontSize="sm" fontFamily="body">
                    Depósito Bancário
                  </Text>
                </HStack>
              )
          )}
        </VStack>
      </ScrollView>
      <VStack
        pt="5"
        pb="7"
        bgColor="gray.700"
        mt="auto"
        px={6}
        justifyContent="space-between"
      >
        {isActive ? (
          <ButtonComponent
            title="Reativar anúncio"
            variant="blue"
            mb="2"
            onPress={handleChangeActiveAd}
          >
            <Power size="16" color="#EDECEE" />
          </ButtonComponent>
        ) : (
          <ButtonComponent
            title="Desativar anúncio"
            variant="black"
            mb="2"
            onPress={handleChangeActiveAd}
          >
            <Power size="16" color="#EDECEE" />
          </ButtonComponent>
        )}
        <ButtonComponent title="Excluir anúncio" variant="light">
          <Trash size="16" color="#5F5B62" />
        </ButtonComponent>
      </VStack>
    </VStack>
  );
}
