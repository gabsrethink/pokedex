import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux"; // Importamos o hook para acessar o Redux
import { PokemonCard } from "@/components/pokemonCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { router } from "expo-router";

const FavoritedPokemonList = () => {
  const pokemonList = useSelector((state) => state.pokemonList);
  const favoritedPokemons = pokemonList.filter((pokemon) => pokemon.favorite);

  return (
    <Animated.View entering={FadeIn.duration(1000)} className="flex-1 bg-white">
      <Image
        source={require("@/assets/backgroundLogo.png")}
        className="absolute top-0 right-0"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-24 pl-8"
      >
        <Image source={require("@/assets/backIcon.png")} />
      </TouchableOpacity>
      <Text className="text-4xl/[42px] font-bold mt-36 mb-8 pl-8">
        {"Favorited Pokémon"}
      </Text>

      {favoritedPokemons.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">
            {"No Pokémon favorited yet."}
          </Text>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <FlatList
            data={favoritedPokemons}
            keyExtractor={(pokemon) => pokemon.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
              <View className="p-2">
                <PokemonCard pokemon={item} />
              </View>
            )}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default FavoritedPokemonList;
