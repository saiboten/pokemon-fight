"use client";
import { useState } from "react";
import { PokemonWithMove, PokemonWithMoveAndImage } from "./types";
import { Move } from "@prisma/client";
import { Card } from "./Card";

interface FightProps {
  initialPokemonLeft?: PokemonWithMoveAndImage;
  initialPokemonRight?: PokemonWithMoveAndImage;
  fightOver: (
    winner: PokemonWithMoveAndImage,
    loser: PokemonWithMoveAndImage
  ) => void;
}

export const Fight = ({
  initialPokemonLeft,
  initialPokemonRight,
  fightOver,
}: FightProps) => {
  const [log, setLog] = useState<Array<string>>([]);

  const [leftAttacking, setLeftAttacking] = useState(false);
  const [rightAttacking, setRightAttacking] = useState(false);

  const [pokemonLeft, setPokemonLeft] = useState<
    PokemonWithMoveAndImage | undefined
  >(initialPokemonLeft);
  const [pokemonRight, setPokemonRight] = useState<
    PokemonWithMoveAndImage | undefined
  >(initialPokemonRight);

  // if (!pokemonLeft || !pokemonRight) {
  //   return null;
  // }

  function handleAttackClickLeftAnimation(
    pokemon: PokemonWithMove,
    move: Move
  ) {
    setLeftAttacking(true);

    setTimeout(() => {
      handleAttackClick(pokemon, move);
      setLeftAttacking(false);
    }, 500);
  }

  function handleAttackClickRightAnimation(
    pokemon: PokemonWithMove,
    move: Move
  ) {
    setRightAttacking(true);

    setTimeout(() => {
      handleAttackClick(pokemon, move);
      setRightAttacking(false);
    }, 1000);
  }

  function handleAttackClick(pokemon: PokemonWithMove, move: Move) {
    if (pokemonLeft === undefined || pokemonRight === undefined) {
      throw new Error("Missing pokemon");
    }

    var selectedPokemon =
      pokemon.name === pokemonLeft.name ? pokemonRight : pokemonLeft;

    const damage = Math.min(
      selectedPokemon.hp,
      move.power * (Math.random() < move.successRate ? 1 : 0)
    );

    const newHealth = Math.max(0, selectedPokemon.hp - damage);

    setLog([
      ...log,
      `${pokemon.name} (${pokemon.hp}): ${damage} skade på ${selectedPokemon.name} (${newHealth})`,
    ]);

    pokemon.name === pokemonLeft.name
      ? setPokemonRight({
          ...pokemonRight,
          hp: newHealth,
        })
      : setPokemonLeft({
          ...pokemonLeft,
          hp: newHealth,
        });

    if (newHealth === 0) {
      if (pokemon.name === pokemonLeft.name) {
        fightOver(pokemonLeft, { ...pokemonRight, hp: 0 });
      } else {
        fightOver(pokemonRight, { ...pokemonLeft, hp: 0 });
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center bg-white gap-4 p-4">
        <Card
          fightAnimationLeft={leftAttacking}
          pokemon={pokemonLeft}
          attack={handleAttackClickLeftAnimation}
        />
        <Card
          fightAnimationRight={rightAttacking}
          pokemon={pokemonRight}
          attack={handleAttackClickRightAnimation}
        />
      </div>
      <ul className="bg-white p-4 mt-4 mb-4">
        {log.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};