import { TYPE_COLORS, colors } from "@/styles/colors";

type PokemonType = keyof typeof TYPE_COLORS;

const getColorByPokemonType = (type: string) =>
  TYPE_COLORS[type.toLowerCase() as PokemonType] || colors.gray;

export default getColorByPokemonType;
