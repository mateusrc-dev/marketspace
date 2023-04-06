import { api } from "@services/api";
import { Image, Text, VStack, IImageProps, View } from "native-base";

type AdProps = IImageProps & {
  imagePath: string;
  userAvatar: string;
  type: "new" | "used";
  nameAd: string;
  price: number;
  showAvatar?: boolean;
  isActive?: boolean;
};

export function Ad({
  imagePath,
  type,
  userAvatar,
  nameAd,
  price,
  showAvatar = true,
  isActive = true,
  ...rest
}: AdProps) {
  return (
    <VStack mb="6">
      <View position="relative" w="153" h="100">
        <Image
          {...rest}
          source={{ uri: `${api.defaults.baseURL}/images/${imagePath}` }}
          alt="imagem do produto do usuário"
          w="153"
          h="100"
          resizeMode="cover"
          rounded="6"
        />
        {showAvatar && (
          <Image
            {...rest}
            source={{ uri: `${api.defaults.baseURL}/images/${userAvatar}` }}
            alt="avatar do usuário"
            position="absolute"
            rounded="full"
            borderWidth="1"
            borderColor="gray.700"
            resizeMode="cover"
            w={6}
            h={6}
            top="1"
            left="1"
          />
        )}
        <View
          top="1"
          right="1"
          position="absolute"
          py="0.5"
          px="2"
          rounded="full"
          bgColor={type === "new" ? "blue.100" : "gray.200"}
        >
          <Text color="#FFFFFF" fontSize="10" fontWeight="bold">
            {type === "new" ? "NOVO" : "USADO"}
          </Text>
        </View>
        {isActive === false && (
          <View
            bgColor="#000000"
            opacity="0.5"
            position="absolute"
            rounded="6"
            w="153"
            h="100"
          />
        )}
        {isActive === false && (
          <Text
            color="gray.700"
            fontSize="11"
            fontWeight="bold"
            position="absolute"
            bottom="2"
            left="2"
          >
            ANÚNCIO DESATIVADO
          </Text>
        )}
      </View>
      <VStack space="0.5">
        <Text
          mt="1"
          fontSize="sm"
          fontFamily="body"
          color={isActive ? "gray.200" : "gray.400"}
        >
          {nameAd}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="bold"
          color={isActive ? "gray.100" : "gray.400"}
          fontFamily="body"
        >
          R$
          <Text
            fontSize="md"
            fontWeight="bold"
            color={isActive ? "gray.100" : "gray.400"}
            fontFamily="body"
          >
            {price}
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
}
