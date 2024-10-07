import { SinglePokemon } from "@/interfaces/pokemonInterfaces";
import { createSlice, configureStore } from "@reduxjs/toolkit";

export const initialState = { pokemonList: [], currentPage: -1 };
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILL_LIST": {
      return { ...state, pokemonList: action.payload };
    }
    case "FAVORITE": {
      const favoritedList = state.pokemonList.map((pokemon) => {
        if (pokemon.id === action.payload) {
          return { ...pokemon, favorite: !pokemon.favorite };
        }
        return pokemon;
      });
      return { ...state, pokemonList: favoritedList };
    }
    case "CHANGE_PAGE": {
      return { ...state, currentPage: action.payload };
    }
    default:
      return state;
  }
};

export const onLoadList = (_pokemonList: SinglePokemon[]) => {
  return { type: "FILL_LIST", payload: _pokemonList };
};

export const onFavorite = (pokemonId: string) => {
  return { type: "FAVORITE", payload: pokemonId };
};

export const onPageChange = (currentPage: number) => {
  return { type: "CHANGE_PAGE", payload: currentPage };
};
