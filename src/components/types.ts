import { Move, Pokemon as PokemonRaw } from "@prisma/client";

export type Types = "water" | "grass" | "fire";

export type PokemonTypeCheck = {
  type: Types;
} & Omit<PokemonRaw, "type">;

export type PokemonWithMove = PokemonRaw & { moves?: Move[] };
export type PokemonWithMoveAndImage = PokemonRaw & { moves?: Move[] } & {
  image: { image: string } | null;
};

export type PokemonNoId = Omit<PokemonRaw, "id"> & { moves?: Move[] } & {
  image: { image: string } | null;
};

export function pokemonHasImage(
  pokemon: PokemonWithMove | PokemonWithMoveAndImage
): pokemon is PokemonWithMoveAndImage {
  return (pokemon as PokemonWithMoveAndImage).image !== undefined;
}
