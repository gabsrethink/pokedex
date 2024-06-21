import { useEffect, useRef, useState } from "react";

import {
  PokemonPaginatedResponse,
  Result,
  SinglePokemon,
} from "@/interfaces/pokemonInterfaces";
import axios from "axios";

const pokemonApi = axios.create();

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SinglePokemon[]>(
    []
  );

  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=10");

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current
    );

    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SinglePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split("/");

      const id = urlParts[urlParts.length - 2];

      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id,
        name,
        picture,
      };
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    simplePokemonList,
    isLoading,
    loadPokemons,
  };
};
