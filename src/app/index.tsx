import { useRef } from "react";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Splash() {
  const animation = useRef(null);
  return (
    <Animated.View
      entering={FadeIn.duration(1000)}
      className="flex-1 items-center justify-center"
    >
      <Button title={"Pokédex"} color={colors.grassType} />
    </Animated.View>
  );
}
