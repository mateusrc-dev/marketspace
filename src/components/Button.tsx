import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string,
}

export function Button({title, ...props}: Props) {
  return (
      <ButtonNativeBase {...props} w="full" rounded={6}>
        <Text>{title}</Text>
      </ButtonNativeBase>
    )
}