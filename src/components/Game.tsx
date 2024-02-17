"use client";

import { useState } from "react";
import { Button } from "./Button";
import Image from "next/image";
import { Move, Pokemon } from "./types";
import { Card } from "./Card";

export const Pokemen = () => {
  const [log, setLog] = useState<Array<string>>([]);

  const [pokemon1, setPokemon1] = useState<Pokemon | undefined>();
  const [pokemon2, setPokemon2] = useState<Pokemon | undefined>();

  const [gameOver, setGameOver] = useState(false);

  function handleAttackClick(pokemon: Pokemon, move: Move) {
    if (pokemon1 === undefined || pokemon2 === undefined) {
      throw new Error("Missing pokemon");
    }
    var selectedPokemon = pokemon.name === pokemon1.name ? pokemon2 : pokemon1;

    const damage = Math.min(
      selectedPokemon.health,
      move.power * (Math.random() < move.successRate ? 1 : 0)
    );

    const newHealth = Math.max(0, selectedPokemon.health - damage);

    setLog([
      ...log,
      `${pokemon.name} (${pokemon.health}): ${damage} skade på ${selectedPokemon.name} (${newHealth})`,
    ]);

    pokemon.name === pokemon1.name
      ? setPokemon2({
          ...pokemon2,
          health: newHealth,
        })
      : setPokemon1({
          ...pokemon1,
          health: newHealth,
        });

    if (newHealth <= 0) {
      setGameOver(true);
    }
  }

  function reset() {
    setGameOver(false);
    setLog([]);
  }

  return (
    <div>
      <div className="flex justify-center bg-white gap-4 p-4">
        {/* attack={handleAttackClick} */}
        <Card pokemon={pokemon1} />
        {/* attack={handleAttackClick} */}
        <Card pokemon={pokemon2} />
      </div>
      <ul className="bg-white p-4 mt-4 mb-4">
        {log.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};
