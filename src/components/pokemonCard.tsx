import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { SinglePokemon } from "@/interfaces/pokemonInterfaces";

interface Props {
  pokemon: SinglePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  return (
    <TouchableOpacity className="w-[155] h-[111] items-center justify-center rounded-[15] shadow">
      <View>
        <Text>
          {pokemon.name}
          {"\n#" + pokemon.id}
        </Text>
        <Image source={{ uri: pokemon.picture }} className="w-20 h-20" />
      </View>
    </TouchableOpacity>
  );
};
