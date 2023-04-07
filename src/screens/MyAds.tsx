import { Ad } from "@components/Ad";
import { Loading } from "@components/Loading";
import { ProductsDTO } from "@dtos/ProductsDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesPropsTwo } from "@routes/app.routes";
import { api } from "@services/api";
import axios from "axios";
import {
  HStack,
  Text,
  VStack,
  Select,
  CheckIcon,
  View,
  useToast,
  FlatList,
} from "native-base";
import { Plus } from "phosphor-react-native";
import React, { useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";

export function MyAds() {
  const [value, setValue] = useState<string>("todos");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigationApp = useNavigation<AppNavigatorRoutesPropsTwo>();
  const [productsUser, setProductsUser] = useState<ProductsDTO[]>([]);
  const toast = useToast();

  function handleNavigationCreateAd() {
    navigationApp.navigate("createAd");
  }

  function handleNavigationMyAdDetails(id: string) {
    navigationApp.navigate("myAdDetails", { id });
  }

  async function fetchUserProducts() {
    try {
      setIsLoading(true);
      const response = await api.get("/users/products");
      setProductsUser(response.data);
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

  useFocusEffect(
    useCallback(() => {
      fetchUserProducts();
    }, [])
  );

  const booleanVar =
    value === "todos" ? undefined : value === "ativo" ? true : false;

  return (
    <VStack flex={1} bgColor="gray.600">
      <HStack alignItems="center" mt="9" justifyContent="center">
        <View position="absolute" right="6">
          <TouchableOpacity onPress={handleNavigationCreateAd}>
            <Plus size={24} color="#1A181B" />
          </TouchableOpacity>
        </View>
        <Text fontFamily="heading" fontSize="lg" color="gray.100">
          Meus anúncios
        </Text>
        <View />
      </HStack>
      <HStack alignItems="center" px="6" justifyContent="space-between" mt="8">
        <Text color="gray.200" fontSize="sm" fontFamily="body">
          {productsUser.length} anúncios
        </Text>
        <View>
          <VStack alignItems="center" space={4}>
            <Select
              shadow={2}
              selectedValue={value}
              width="111"
              height="34"
              accessibilityLabel="show ad"
              placeholder="Todos"
              placeholderTextColor={"gray.100"}
              fontSize="sm"
              fontFamily="body"
              color="gray.100"
              _selectedItem={{
                bg: "gray.500",
                endIcon: <CheckIcon size={5} />,
              }}
              _light={{
                bg: "gray.700",
              }}
              _dark={{
                bg: "gray.100",
              }}
              onValueChange={(itemValue) => setValue(itemValue)}
            >
              <Select.Item shadow={2} label="Todos" value={"todos"} />
              <Select.Item shadow={2} label="Ativos" value={"ativo"} />
              <Select.Item shadow={2} label="Inativos" value={"inativo"} />
            </Select>
          </VStack>
        </View>
      </HStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={productsUser}
          keyExtractor={(item) => item.id}
          numColumns={2}
          px={6}
          mt={6}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={
            productsUser.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text
              color="blue.200"
              fontSize="lg"
              fontWeight="bold"
              fontFamily="body"
              textAlign="center"
            >
              Você ainda não criou produtos, crie um novo produto e anuncie ele!
            </Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigationMyAdDetails(item.id)}
            >
              {booleanVar === item.is_active || booleanVar === undefined ? (
                <Ad
                  isActive={item.is_active}
                  userAvatar=""
                  showAvatar={false}
                  nameAd={item.name}
                  price={item.price}
                  type={item.is_new === true ? "new" : "used"}
                  imagePath={item.product_images[0].path}
                />
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </VStack>
  );
}
