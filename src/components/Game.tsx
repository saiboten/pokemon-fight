"use client";
import { useState } from "react";
import { PokemonWithMoveAndImage } from "./types";
import { Level } from "./Level";

export const Levels = ({
  pokemen,
  pokemon,
  currentLevel,
  gameOver,
  levelWon,
}: {
  pokemen: Array<PokemonWithMoveAndImage>;
  pokemon: PokemonWithMoveAndImage;
  currentLevel: number;
  gameOver: () => void;
  levelWon: () => void;
}) => {
  function handleLevelOver(updatedPokemon: PokemonWithMoveAndImage) {
    if (updatedPokemon.hp === 0) {
      gameOver();
    } else {
      levelWon();
    }
  }

  if (currentLevel === 0) {
    return (
      <Level
        fightOver={handleLevelOver}
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

  if (currentLevel === 1) {
    return (
      <Level
        key={currentLevel}
        fightOver={handleLevelOver}
        levelName="Level 2"
        pokemon={[pokemon]}
        adversaries={[
          {
            hp: 1000,
            id: -1,
            image: { image: "" },
            name: "Peedle",
            moves: [
              {
                power: 5,
                successRate: 1,
                id: -1,
                name: "Pes",
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
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  function handleLevelWon() {
    setLevel(level + 1);
    if (level + 1 === 2) {
      setGameWon(true);
    }
  }

  function handleGameOver() {}

  if (pokemon === null) {
    throw new Error("What");
  }

  if (pokemen === null) {
    throw new Error("Setup error");
  }

  if (gameOver) {
    return <div>Spill slutt</div>;
  }

  if (gameWon) {
    return <div>Du har klart spillet!!!!</div>;
  }

  return (
    <div>
      <h1>Din startpokemon:</h1>
      <ul>
        <li>{pokemon.name}</li>
        <li>{pokemon.hp}</li>
      </ul>

      <Levels
        gameOver={handleGameOver}
        levelWon={handleLevelWon}
        currentLevel={level}
        pokemon={pokemon}
        pokemen={pokemen}
      />
    </div>
  );
};
