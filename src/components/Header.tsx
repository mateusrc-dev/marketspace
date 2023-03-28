import { Heading, HStack, Text, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { ButtonComponent } from "./Button";

type HeaderProps = {
  type?: "homeHeader" | "Olá";
};

export function Header({ type = "homeHeader" }: HeaderProps) {
  if (type === "homeHeader") {
    return (
      <HStack alignItems="center" px={12} pb={5} pt={16}>
        <VStack>
          <Text>Boas vindas, </Text>
          <Text
            fontWeight="bold"
            fontFamily="body"
            fontSize="md"
            color="gray.100"
          >
            Mateus!
          </Text>
        </VStack>
        <ButtonComponent title="Criar anúncio" variant="black">
          <Plus weight="regular" color="#EDECEE" size={16} />
        </ButtonComponent>
      </HStack>
    );
  } else {
    return <Text>Olá</Text>;
  }
}
