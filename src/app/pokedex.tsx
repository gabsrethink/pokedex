import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { usePokemonPaginated } from "@/server/pagination";
import { PokemonCard } from "@/components/pokemonCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { onPageChange } from "@/store";

const PokedexList = () => {
  const currentPage = useSelector((state) => state.currentPage);
  console.log(currentPage);
  const dispatch = useDispatch();
  const handleChangePage = (value: number) => {
    console.log(value);
    dispatch(onPageChange(value));
  };
  const {
    simplePokemonList,
    loadPokemons,
    loadPreviousPokemons,
    isLoading,
    isFirstPage,
  } = usePokemonPaginated(currentPage, handleChangePage);

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
      {isLoading ? (
        <ActivityIndicator style={{ height: 100 }} size={20} color="grey" />
      ) : (
        <View className="flex-1 items-center justify-center">
          <FlatList
            data={simplePokemonList}
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
      <View className="flex-row justify-between p-4 items-center">
        <Button
          title="Anterior"
          onPress={loadPreviousPokemons}
          disabled={isFirstPage}
        />
        <Text className="text-lg font-bold">{`Page ${currentPage + 1}`}</Text>
        <Button title="Próximo" onPress={loadPokemons} />
      </View>
    </Animated.View>
  );
};

export default PokedexList;
