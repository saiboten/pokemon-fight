"use client";
import { useState } from "react";
import { PokemonWithMoveAndImage } from "./types";
import { Level } from "./Level";

export const Levels = ({
  pokemen,
  pokemon,
  currentLevel,
}: {
  pokemen: Array<PokemonWithMoveAndImage>;
  pokemon: PokemonWithMoveAndImage;
  currentLevel: number;
}) => {
  if (currentLevel === 0) {
    return (
      <Level
        fightOver={() => console.log("what")}
        levelName="Level 1"
        pokemon={[pokemon]}
        adversaries={[
          {
            hp: 500,
            id: -1,
            image: { image: "" },
            name: "Weedle",
            moves: [
              {
                power: 10,
                successRate: 1,
                id: -1,
                name: "Pust",
                pokemonId: -1,
              },
            ],
          },
        ]}
      ></Level>
    );
  }
  return null;
};

interface Props {
  selectedPokemon: PokemonWithMoveAndImage | null;
  pokemen: Array<PokemonWithMoveAndImage> | null;
}

export const Game = ({ pokemen, selectedPokemon }: Props) => {
  const [pokemon, setPokemon] = useState(selectedPokemon);
  const [level, setLevel] = useState(0);

  if (pokemon === null) {
    throw new Error("What");
  }

  if (pokemen === null) {
    throw new Error("Setup error");
  }

  return (
    <div>
      <h1>Din startpokemon:</h1>
      <ul>
        <li>{pokemon.name}</li>
        <li>{pokemon.hp}</li>
      </ul>

      <Levels currentLevel={level} pokemon={pokemon} pokemen={pokemen} />
    </div>
  );
};
