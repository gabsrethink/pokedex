import { Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { usePokemonPaginated } from "@/server/pagination";
import { PokemonCard } from "@/components/pokemonCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { router } from "expo-router";

const PokedexList = () => {
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

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
        {"Pokedex"}
      </Text>
      <FlatList
        data={simplePokemonList}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <ActivityIndicator style={{ height: 100 }} size={20} color="grey" />
        }
      />
    </Animated.View>
  );
};

export default PokedexList;
