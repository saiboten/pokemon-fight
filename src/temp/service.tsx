export type Pokemon = {
  id: number;
  name: string;
  hp: number;
  attack: number;
};

type AddPokemon = {
  name: string;
  hp: number;
  attack: number;
};

export function addPokemon(pokemon: AddPokemon) {}
