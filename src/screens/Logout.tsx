import { Loading } from "@components/Loading";
import { Center, Text } from "native-base";

export function Logout() {
  return (
    <Center flex={1}>
      <Text>
        Essa página será uma página de passagem do carregamento do logout do
        usuário...
        <Loading />
      </Text>
    </Center>
  );
}
