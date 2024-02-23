"use client";
import { useState } from "react";
import { PokemonWithMove, PokemonWithMoveAndImage } from "./types";
import { Move } from "@prisma/client";
import { Card } from "./Card";

interface FightProps {
  ai?: boolean;
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
  ai,
}: FightProps) => {
  const [leftAttacking, setLeftAttacking] = useState(false);
  const [rightAttacking, setRightAttacking] = useState(false);

  const [pokemonLeft, setPokemonLeft] = useState<
    PokemonWithMoveAndImage | undefined
  >(initialPokemonLeft);
  const [pokemonRight, setPokemonRight] = useState<
    PokemonWithMoveAndImage | undefined
  >(initialPokemonRight);
  const attackOngoing = leftAttacking || rightAttacking;

  function handleAttackClickLeftAnimation(
    pokemon: PokemonWithMove,
    move: Move
  ) {
    if (attackOngoing) {
      return;
    }
    setLeftAttacking(true);

    setTimeout(() => {
      handleAttackClick(pokemon, move);
      if (!ai) {
        setLeftAttacking(false);
      }
    }, 500);

    if (ai) {
      if (pokemonRight === undefined || pokemonRight?.moves === undefined) {
        throw new Error("No right pokemon?! And AI? Error");
      }

      const move = pokemonRight.moves?.[0];

      if (move === undefined) {
        throw new Error("No move..");
      }

      setTimeout(() => {
        setLeftAttacking(false);
        handleAttackClickRightAnimation(pokemonRight, move);
      }, 1500);
    }
  }

  function handleAttackClickRightAnimation(
    pokemon: PokemonWithMove,
    move: Move
  ) {
    if (attackOngoing) {
      return;
    }
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
          attack={attackOngoing ? undefined : handleAttackClickLeftAnimation}
        />
        <Card
          fightAnimationRight={rightAttacking}
          pokemon={pokemonRight}
          attack={ai ? undefined : handleAttackClickRightAnimation}
        />
      </div>
    </div>
  );
};
