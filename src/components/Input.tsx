import {
  Input as NativeBaseInput,
  IInputProps,
  View,
  Button,
} from "native-base";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";

type PropsInput = IInputProps & {
  secure?: boolean;
};

export function Input({ secure = false, ...rest }: PropsInput) {
  const [state, setState] = useState<boolean>(true);

  function handleState() {
    if (state === true) {
      setState(false);
    } else if (state === false) {
      setState(true);
    }
  }

  if (secure === true) {
    return (
      <View>
        <NativeBaseInput
          bgColor="gray.700"
          fontSize="md"
          borderWidth={0}
          color="gray.100"
          placeholderTextColor="gray.400"
          fontFamily="body"
          rounded={6}
          secureTextEntry={state}
          position="relative"
          _focus={{
            bgColor: "gray.700",
            borderWidth: 1,
            borderColor: "gray.100",
          }}
          {...rest}
        />
        <View position="absolute" right={0}>
          {state ? (
            <Button onPress={handleState} bgColor="transparent">
              <Eye color={"#1A181B"} />
            </Button>
          ) : (
            <Button onPress={handleState} bgColor="transparent">
              <EyeSlash color={"#1A181B"} />
            </Button>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <NativeBaseInput
        bgColor="gray.700"
        fontSize="md"
        borderWidth={0}
        color="gray.100"
        placeholderTextColor="gray.400"
        fontFamily="body"
        rounded={6}
        _focus={{
          bgColor: "gray.700",
          borderWidth: 1,
          borderColor: "gray.100",
        }}
        {...rest}
      />
    );
  }
}
