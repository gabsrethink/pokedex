import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { SinglePokemon } from "@/interfaces/pokemonInterfaces";
import getColorByPokemonType from "@/utils/getColorByType";
import { router } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";

interface Props {
  pokemon: SinglePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const handleNavigateToPokemon = useCallback(() => {
    router.navigate(`/pokemonDetails?pokemon=${JSON.stringify(pokemon)}`);
  }, [router, pokemon]);

  const backgroundColor = useMemo(
    () => getColorByPokemonType(pokemon.types[0]),
    [pokemon.types]
  );
  return (
    <Animated.View entering={FadeIn.duration(600)}>
      <TouchableOpacity
        className="relative overflow-hidden w-44 h-28 p-2 rounded-lg shadow-lg"
        style={{ backgroundColor }}
        onPress={handleNavigateToPokemon}
      >
        <ImageBackground
          source={require("@/assets/backgroundLogo.png")}
          resizeMode="contain"
          className="w-full h-full opacity-30 absolute"
          style={{ right: -30 }}
        />
        <View className="p-2 flex-row justify-between items-center">
          <View>
            <Text className="text-white text-base font-bold capitalize">
              {pokemon.name}
            </Text>
            <Text className="text-white text-sm">{"#" + pokemon.id}</Text>
            <View className="mt-1">
              {pokemon.types.map((type) => (
                <Text key={type} className="text-white text-xs capitalize">
                  {type}
                </Text>
              ))}
            </View>
          </View>
          <Image source={{ uri: pokemon.picture }} className="w-20 h-20" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
