"use client";
import { useState } from "react";
import { PokemonWithMoveAndImage } from "./types";

interface Props {
  selectedPokemon: PokemonWithMoveAndImage | null;
}

export const Game = ({ selectedPokemon }: Props) => {
  const [pokemon, setPokemon] = useState(selectedPokemon);

  if (pokemon === null) {
    throw new Error("What");
  }
  return (
    <div>
      <h1>Din startpokemon:</h1>
      <ul>
        <li>{pokemon.name}</li>
        <li>{pokemon.hp}</li>
      </ul>
    </div>
  );
};
