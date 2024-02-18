import { Move, Pokemon } from "@prisma/client";

export type PokemonWithMove = Pokemon & { moves: Move[] };
export type PokemonWithMoveAndImage = Pokemon & { moves: Move[] } & {
  image: { image: string } | null;
};
