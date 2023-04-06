import {
  Input as NativeBaseInput,
  IInputProps,
  View,
  Button,
  HStack,
  Text,
} from "native-base";
import { Eye, EyeSlash, MagnifyingGlass, Sliders } from "phosphor-react-native";
import { useState } from "react";

type PropsInput = IInputProps & {
  secure?: boolean;
  search?: boolean;
  handleStateFilter?: () => void;
  handleSearch?: () => void;
  purchase?: boolean;
  errorMessage?: string | null;
};

export function Input({
  secure = false,
  search = false,
  purchase = false,
  handleSearch = () => {},
  handleStateFilter = () => {},
  isInvalid,
  errorMessage = null,
  ...rest
}: PropsInput) {
  const [state, setState] = useState<boolean>(true);
  const invalid = !!errorMessage || isInvalid;

  function handleState() {
    if (state === true) {
      setState(false);
    } else if (state === false) {
      setState(true);
    }
  }

  if (secure === true) {
    return (
      <>
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
            isInvalid={invalid}
            _invalid={{
              borderWidth: 1,
              borderColor: "red.100",
            }}
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
      </>
    );
  } else if (search === true) {
    return (
      <>
        <View>
          <NativeBaseInput
            bgColor="gray.700"
            fontSize="md"
            borderWidth={0}
            color="gray.100"
            placeholderTextColor="gray.400"
            fontFamily="body"
            rounded={6}
            position="relative"
            isInvalid={invalid}
            _invalid={{
              borderWidth: 1,
              borderColor: "red.100",
            }}
            _focus={{
              bgColor: "gray.700",
              borderWidth: 1,
              borderColor: "gray.100",
            }}
            {...rest}
          />
          <HStack position="absolute" right={0.485} top={0.485}>
            <Button
              bgColor="transparent"
              _pressed={{ bg: "gray.400" }}
              onPress={handleSearch}
            >
              <MagnifyingGlass color={"#1A181B"} />
            </Button>
            <View
              borderRightWidth="1"
              borderRightColor="gray.400"
              rounded="none"
              h="18"
              marginY="auto"
            />
            <Button
              onPress={handleStateFilter}
              bgColor="transparent"
              _pressed={{ bg: "gray.400" }}
            >
              <Sliders color={"#1A181B"} />
            </Button>
          </HStack>
        </View>
      </>
    );
  } else if (purchase === true) {
    return (
      <>
        <View>
          <NativeBaseInput
            bgColor="gray.700"
            fontSize="md"
            borderWidth={0}
            color="gray.100"
            pl="12"
            placeholderTextColor="gray.400"
            fontFamily="body"
            rounded={6}
            position="relative"
            isInvalid={invalid}
            _invalid={{
              borderWidth: 1,
              borderColor: "red.100",
            }}
            _focus={{
              bgColor: "gray.700",
              borderWidth: 1,
              borderColor: "gray.100",
            }}
            {...rest}
          />
          <View position="absolute" left="4" top="2.5">
            <Text color="gray.100" fontSize="md" fontFamily="body" mx={6}>
              R$
            </Text>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <NativeBaseInput
          bgColor="gray.700"
          fontSize="md"
          borderWidth={0}
          color="gray.100"
          placeholderTextColor="gray.400"
          fontFamily="body"
          rounded={6}
          isInvalid={invalid}
          _invalid={{
            borderWidth: 1,
            borderColor: "red.100",
          }}
          _focus={{
            bgColor: "gray.700",
            borderWidth: 1,
            borderColor: "gray.100",
          }}
          {...rest}
        />
      </>
    );
  }
}
