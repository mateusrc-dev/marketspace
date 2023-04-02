import { Ad } from "@components/Ad";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesPropsTwo } from "@routes/app.routes";
import { HStack, Text, VStack, Select, CheckIcon, View } from "native-base";
import { Plus } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

export function MyAds() {
  const [value, setValue] = useState<string>("todos");
  const navigationApp = useNavigation<AppNavigatorRoutesPropsTwo>();

  function handleNavigationCreateAd() {
    navigationApp.navigate("createAd");
  }

  function handleNavigationMyAdDetails() {
    navigationApp.navigate("myAdDetails");
  }

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
          9 anúncios
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
              <Select.Item shadow={2} label="Todos" value="todos" />
              <Select.Item shadow={2} label="Ativos" value="ativos" />
              <Select.Item shadow={2} label="Inativos" value="inativos" />
            </Select>
          </VStack>
        </View>
      </HStack>
      <HStack px={6} flexWrap={"wrap"} justifyContent="space-between" mt="5">
        <TouchableOpacity onPress={handleNavigationMyAdDetails}>
          <Ad
            userAvatar="https://github.com/mateusrc-dev.png"
            nameAd="pudim de ovo"
            price="100"
            type="new"
            imagePath={
              "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
            }
            showAvatar={false}
            isActive={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationMyAdDetails}>
          <Ad
            userAvatar="https://github.com/mateusrc-dev.png"
            nameAd="pudim de ovo"
            price="100"
            type="new"
            imagePath={
              "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
            }
            showAvatar={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationMyAdDetails}>
          <Ad
            userAvatar="https://github.com/mateusrc-dev.png"
            nameAd="pudim de ovo"
            price="100"
            type="new"
            imagePath={
              "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
            }
            showAvatar={false}
            isActive={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigationMyAdDetails}>
          <Ad
            userAvatar="https://github.com/mateusrc-dev.png"
            nameAd="pudim de ovo"
            price="100"
            type="new"
            imagePath={
              "https://a-static.mlcdn.com.br/800x560/bicicleta-aro-29-mountain-bike-caloi-velox-freio-v-brake-21-marchas/magazineluiza/224968700/f8e8eac41c5d1b42ccac9cc345008608.jpg"
            }
            showAvatar={false}
          />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
