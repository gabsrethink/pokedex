import { useRef } from "react";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import Animated, { FadeIn } from "react-native-reanimated";
import { View, Image, Text } from "react-native";

export default function HomeScreen() {
  const animation = useRef(null);
  return (
    <Animated.View entering={FadeIn.duration(1000)} className="flex-1 bg-gray">
      <View className="h-[500] flex-col bg-white rounded-b-[32]">
        <Image
          source={require("@/assets/backgroundLogo.png")}
          className="absolute top-0 right-0"
        />
        <Text className="text-4xl/[42px] font-bold mt-32 mb-8 self-center mr-12">
          {"What Pokémon \nare you looking for?"}
        </Text>
        <View className="flex-row flex-wrap gap-4 justify-center">
          <Button link="/pokedex" title={"Pokédex"} color={colors.grassType} />
          <Button title={"Moves"} color={colors.fireType} />
          <Button title={"Abilities"} color={colors.waterType} />
          <Button title={"Items"} color={colors.electricType} />
          <Button title={"Locations"} color={colors.poisonType} />
          <Button title={"Type Charts"} color={colors.groundType} />
        </View>
      </View>
    </Animated.View>
  );
}
