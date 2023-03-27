import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
  variant?: "light" | "blue";
};

export function Button({ title, variant = "blue", ...props }: Props) {
  return (
    <ButtonNativeBase
      {...props}
      w="full"
      rounded={6}
      bgColor={variant === "blue" ? "blue.200" : "gray.500"}
      _pressed={variant === "blue" ? { bg: "blue.100" } : { bg: "gray.400" }}
    >
      <Text
        color={variant === "blue" ? "gray.700" : "gray.200"}
        fontWeight="bold"
        fontFamily="body"
        fontSize="sm"
        p={1}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
