import React, { useState } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { onFavorite } from "@/store";

const PokemonDetails = () => {
  const params = useLocalSearchParams<{ pokemon: string }>();

  const { pokemon } = params;
  const parsedPokemon = JSON.parse(pokemon);
  const [favorited, setFavorited] = useState(parsedPokemon.favorite);
  const { id, name, picture } = parsedPokemon;
  const dispatch = useDispatch();
  const toggleFavorite = () => {
    setFavorited(!favorited);
    dispatch(onFavorite(id));
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-24 pl-8"
      >
        <Image source={require("@/assets/backIcon.png")} />
      </TouchableOpacity>
      <Image source={{ uri: picture }} className="w-48 h-48" />
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Button
        title={favorited ? "Favoritado" : "Favoritar"}
        onPress={toggleFavorite}
        color={favorited ? "green" : "blue"}
      />
    </View>
  );
};

export default PokemonDetails;
