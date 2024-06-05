import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  color?: string;
};

export function Button({
  title,
  isLoading = false,
  color = "red",
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      className="w-[155] h-[60] items-center justify-center rounded-[15]"
      style={{ backgroundColor: color }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <ImageBackground
          source={require("@/assets/background.png")}
          className="w-full h-full justify-center pl-4"
        >
          <Text className="text-base font-bold color-white">{title}</Text>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
}
