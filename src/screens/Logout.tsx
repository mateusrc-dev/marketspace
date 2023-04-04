import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { Center, Text } from "native-base";
import { useEffect } from "react";

export function Logout() {
  const { signOut } = useAuth();

  async function userLogout() {
    await signOut();
  }

  useEffect(() => {
    userLogout();
  }, []);

  return (
    <Center flex={1}>
      <Text>
        Saindo da sua conta...
        <Loading />
      </Text>
    </Center>
  );
}
