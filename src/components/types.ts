import { Move, Pokemon } from "@prisma/client";

export type PokemonWithMove = Pokemon & { moves: Move[] };
