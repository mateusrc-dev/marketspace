import { HStack, Text, VStack, Select, CheckIcon } from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";

export function MyAdDetails() {
  const [value, setValue] = useState<string>("todos");

  return (
    <VStack flex={1}>
      <HStack>
        <Text fontFamily="heading">Meus anúncios</Text>
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
    </VStack>
  );
}
