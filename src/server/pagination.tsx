import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  PokemonFull,
  PokemonPaginatedResponse,
  Result,
  SinglePokemon,
} from "@/interfaces/pokemonInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { onLoadList } from "@/store";

const pokemonApi = axios.create();

export const usePokemonPaginated = (
  page: number,
  handleChangePage: (value: number) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [currentPage, setCurrentPage] = useState(-1);
  const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=10");
  const previousPageUrl = useRef<string | null>(null);
  const dispatch = useDispatch();
  const simplePokemonList = useSelector((state) => state.pokemonList);
  console.log(simplePokemonList.length);
  const loadPokemons = async () => {
    if (!nextPageUrl.current) {
      return;
    }

    setIsLoading(true);
    if (simplePokemonList.length >= (page + 2) * 10) {
      console.log("TESTE 1");
      handleChangePage(page + 1);
      setIsLoading(false);
      return;
    }
    try {
      console.log(nextPageUrl.current);
      const resp = await pokemonApi.get<PokemonPaginatedResponse>(
        nextPageUrl.current
      );
      console.log("TESTE 2");
      //ADICIONAR OFFSET NA URL

      if (resp.data) {
        nextPageUrl.current = resp.data.next;
        previousPageUrl.current = resp.data.previous;

        mapPokemonList(resp.data.results, false);
        console.log("Page antes de mudar: ", page);
        handleChangePage(page + 1);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const loadPreviousPokemons = async () => {
    if (!previousPageUrl.current) {
      return;
    }
    handleChangePage(page - 1);
  };

  const mapPokemonList = async (pokemonList: Result[], reset = false) => {
    const newPokemonList: SinglePokemon[] = await Promise.all(
      pokemonList.map(async ({ name, url }) => {
        const urlParts = url.split("/");
        const id = urlParts[urlParts.length - 2];
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        const resp = await pokemonApi.get<PokemonFull>(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const types = resp.data.types.map((type) => type.type.name);

        return {
          id,
          name,
          picture,
          types,
        };
      })
    );
    dispatch(
      onLoadList(
        reset ? [...newPokemonList] : [...simplePokemonList, ...newPokemonList]
      )
    );
  };

  useEffect(() => {
    if (page === -1) {
      console.log("UseEffect");
      loadPokemons();
    }
  }, []);

  const filterList = () => {
    // console.log(simplePokemonList);
    // console.log(
    //   "FILTRADO",
    //   simplePokemonList.slice(page * 10, page * 10 + 10)
    // );
    console.log("CURRENT PAGE", page);
    return simplePokemonList.slice(page * 10, page * 10 + 10);
  };

  return {
    simplePokemonList: filterList(),
    isLoading,
    loadPokemons,
    loadPreviousPokemons,
    page,
    isFirstPage: page === 0,
  };
};
