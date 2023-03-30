import { Ad } from "@components/Ad";
import { HStack, Text, VStack, Select, CheckIcon } from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";

export function MyAds() {
  const [value, setValue] = useState<string>("todos");

  return (
    <VStack flex={1}>
      <HStack>
        <Text fontFamily="heading" fontSize="lg" color="gray.100">Meus anúncios</Text>
        <Plus />
      </HStack>

      <HStack>
        <Text>9 anúncios</Text>
        <Select
          selectedValue={value}
          minWidth="200"
          accessibilityLabel="show ad"
          placeholder="Todos"
          placeholderTextColor={"gray.100"}
          _selectedItem={{
            bg: "gray.500",
            endIcon: <CheckIcon size="16" />
          }}
          mt={1} 
          onValueChange={itemValue => setValue(itemValue)}
        >
          <Select.Item label="Todos" value="todos" />
          <Select.Item label="Ativos" value="ativos" />
          <Select.Item label="Inativos" value="inativos" />
        </Select>
      </HStack>
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
    </VStack>
  );
}