import {
  Button as ButtonNativeBase,
  IButtonProps,
  Text,
  View,
} from "native-base";

type Props = IButtonProps & {
  title?: string;
  variant?: "light" | "blue" | "black";
};

export function ButtonComponent({
  title,
  children,
  variant = "blue",
  ...props
}: Props) {
  if (variant === "blue" || variant === "light") {
    return (
      <ButtonNativeBase
        {...props}
        w="full"
        rounded={6}
        bgColor={variant === "blue" ? "blue.200" : "gray.500"}
        _pressed={variant === "blue" ? { bg: "blue.100" } : { bg: "gray.400" }}
      >
        {children && <View>{children}</View>}
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
  } else {
    return (
      <ButtonNativeBase
        {...props}
        w="full"
        rounded={6}
        bgColor="gray.100"
        _pressed={{ bg: "gray.300" }}
      >
        {children && <View>{children}</View>}
        <Text
          color="gray.700"
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
}
