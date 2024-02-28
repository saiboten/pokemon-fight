// Utility types

import { Pokemon, addPokemon } from "./service";

const newPokemon: Pokemon = {
  attack: 50,
  hp: 100,
  name: "Weedle",
};

addPokemon(newPokemon);
