"use client";
import { useState } from "react";
import { PokemonWithMoveAndImage } from "./types";
import { Level } from "./Level";
import { Card } from "./Card";
import { Button } from "./Button";

export const Levels = ({
  pokemen,
  pokemon: initialPokemon,
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
  const [pokemon, setPokemon] = useState(initialPokemon);

  function handleLevelOver(updatedPokemon: PokemonWithMoveAndImage) {
    if (updatedPokemon.hp === 0) {
      gameOver();
    } else {
      levelWon();
      setPokemon(updatedPokemon);
    }
  }

  const weedle = pokemen.find((el) => el.id === 18);
  const kakuna = pokemen.find((el) => el.id === 19);

  const menako = pokemen.find((el) => el.id === 8);

  if (weedle === undefined || kakuna === undefined) {
    throw new Error("Level 1 pokemen not found");
  }

  if (menako === undefined) {
    throw new Error("Level 2 pokemen not found");
  }

  if (currentLevel === 0) {
    return (
      <Level
        key={currentLevel}
        fightOver={handleLevelOver}
        levelName="Level 1"
        pokemon={[pokemon]}
        adversaries={[weedle, kakuna]}
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
        adversaries={[menako]}
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

  function handleGameOver() {
    setGameOver(true);
  }

  function handleNewGame() {
    setLevel(0);
    setGameOver(false);
    setGameWon(false);
  }

  if (pokemon === null) {
    throw new Error("What");
  }

  if (pokemen === null) {
    throw new Error("Setup error");
  }

  if (gameOver) {
    return (
      <div className="flex justify-center items-center m-4">
        <div className="border-4 bg-red-200 rounded-lg w-64 h-64 flex justify-center items-center flex-col gap-4">
          <div className="text-lg">GAME OVER</div>
          <Button onClick={handleNewGame}>Ny kamp</Button>
        </div>
      </div>
    );
  }

  if (gameWon) {
    return (
      <div className="flex justify-center items-center m-4">
        <div className="border-4 bg-red-200 rounded-lg flex flex-col gap-4 p-4">
          <span>Du har klart spillet!!!!</span>
          <Card pokemon={pokemon} />
          <Button onClick={handleNewGame}>Ny kamp</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
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
