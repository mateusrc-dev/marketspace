import { Ad } from "@components/Ad";
import { HStack, Text, VStack, Select, CheckIcon, View } from "native-base";
import { Plus } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
// import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";

const SelectComponent = () => {
  const [value, setValue] = useState<string>("todos");

  return (
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
  );
};

export function MyAds() {
  return (
    <VStack flex={1} bgColor="gray.600">
      <HStack alignItems="center" px="6" justifyContent="space-around" mt="9">
        <View />
        <Text fontFamily="heading" fontSize="lg" color="gray.100">
          Meus anúncios
        </Text>
        <TouchableOpacity>
          <Plus size={24} color="#1A181B" />
        </TouchableOpacity>
      </HStack>

      <HStack alignItems="center" px="6" justifyContent="space-between" mt="8">
        <Text color="gray.200" fontSize="sm" fontFamily="body">
          9 anúncios
        </Text>
        <View>
          <SelectComponent />
        </View>
      </HStack>
      <HStack px={6} flexWrap={"wrap"} justifyContent="space-between" mt="5">
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
      </HStack>
    </VStack>
  );
}

// const styles = StyleSheet.create({})
