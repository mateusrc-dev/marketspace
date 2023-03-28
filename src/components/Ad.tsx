import { Image, Text, VStack, IImageProps, View, HStack } from "native-base";

type AdProps = IImageProps & {
  imagePath: string;
  userAvatar: string;
  type: "new" | "used";
  nameAd: string;
  price: string;
};

export function Ad({
  imagePath,
  type,
  userAvatar,
  nameAd,
  price,
  ...rest
}: AdProps) {
  return (
    <VStack>
      <View position="relative" w="153" h="100">
        <Image
          {...rest}
          source={{ uri: `${imagePath}` }}
          alt="imagem do produto do usuário"
          w="153"
          h="100"
          resizeMode="contain"
          rounded="6"
        />
        <Image
          {...rest}
          source={{ uri: `${userAvatar}` }}
          alt="avatar do usuário"
          position="absolute"
          rounded="full"
          borderWidth="1"
          borderColor="gray.700"
          resizeMode="contain"
          w={6}
          h={6}
          top="1"
          left="1"
        />
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
      </View>
      <VStack space="0.5">
        <Text mt="1" fontSize="sm" fontFamily="body" color="gray.200">
          {nameAd}
        </Text>
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="gray.100"
          fontFamily="body"
        >
          R$ 
          <Text
            fontSize="md"
            fontWeight="bold"
            color="gray.100"
            fontFamily="body"
          >
            {price}
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
}
