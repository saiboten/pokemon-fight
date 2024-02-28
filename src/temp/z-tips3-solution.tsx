// Utility types

import { Pokemon, addPokemon } from "./service";

type PokemonNoId = Omit<Pokemon, "id">;

const newPokemon: PokemonNoId = {
  attack: 50,
  hp: 100,
  name: "Weedle",
};

addPokemon(newPokemon);
