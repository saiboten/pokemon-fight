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

  const weedle = pokemen.find((el) => el.id === 18);
  const kakuna = pokemen.find((el) => el.id === 19);

  if (weedle === undefined || kakuna === undefined) {
    throw new Error("Level 1 pokemen not found");
  }

  if (currentLevel === 0) {
    return (
      <Level
        fightOver={handleLevelOver}
        levelName="Level 1"
        pokemon={[pokemon]}
        adversaries={[weedle, kakuna]}
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
    if (level + 1 === 1) {
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
