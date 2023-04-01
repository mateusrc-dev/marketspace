import { TextArea as TextAreaComponent, ITextAreaProps } from "native-base";

type PropsTextArea = ITextAreaProps & any;

export function TextArea({ ...rest }: PropsTextArea) {
  return (
    <TextAreaComponent
      bgColor="gray.700"
      fontSize="md"
      borderWidth={0}
      color="gray.100"
      placeholderTextColor="gray.400"
      fontFamily="body"
      minHeight={50}
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
