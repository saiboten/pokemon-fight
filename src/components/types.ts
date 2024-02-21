import { Move, Pokemon } from "@prisma/client";

export type PokemonWithMove = Pokemon & { moves?: Move[] };
export type PokemonWithMoveAndImage = Pokemon & { moves?: Move[] } & {
  image: { image: string } | null;
};

export type PokemonNoId = Exclude<Pokemon, "id"> & { moves?: Move[] } & {
  image: { image: string } | null;
};

export function pokemonHasImage(
  pokemon: PokemonWithMove | PokemonWithMoveAndImage
): pokemon is PokemonWithMoveAndImage {
  return (pokemon as PokemonWithMoveAndImage).image !== undefined;
}
