import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { colors } from "@/styles/colors";
import { Link, LinkProps } from "expo-router";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  color?: string;
  link?: LinkProps<string>["href"];
};

export function Button({
  title,
  isLoading = false,
  color = colors.normalType,
  link,
  ...rest
}: Props) {
  return link ? (
    <Link href={link} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isLoading}
        className="w-[155] h-[60] items-center justify-center rounded-[15] shadow z-[10]"
        style={{ backgroundColor: color }}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ImageBackground
            source={require("@/assets/background.png")}
            className="w-full h-full justify-center pl-4"
          >
            <Text className="text-base font-bold color-white">{title}</Text>
          </ImageBackground>
        )}
      </TouchableOpacity>
    </Link>
  ) : (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      className="w-[155] h-[60] items-center justify-center rounded-[15] shadow z-[10]"
      style={{ backgroundColor: color }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator />
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
