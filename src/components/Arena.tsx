"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Move } from "@prisma/client";
import { PokemonWithMove, PokemonWithMoveAndImage } from "./types";
import { Spacer } from "./Spacer";

interface Props {
  pokemen: Array<PokemonWithMove>;
  getPokemon: (id: number) => Promise<PokemonWithMoveAndImage | null>;
}

export const Arena = ({ pokemen, getPokemon }: Props) => {
  const [log, setLog] = useState<Array<string>>([]);
  const [newlyDefeated, setNewlyDefeated] = useState<
    PokemonWithMoveAndImage | undefined
  >();

  const [pokemon1, setPokemon1] = useState<
    PokemonWithMoveAndImage | undefined
  >();
  const [pokemon2, setPokemon2] = useState<
    PokemonWithMoveAndImage | undefined
  >();

  const [gameOver, setGameOver] = useState(false);
  const [leftAttacking, setLeftAttacking] = useState(false);
  const [rightAttacking, setRightAttacking] = useState(false);

  async function handleAddPokemon(pokemon: PokemonWithMove) {
    const pokemonDetails = await getPokemon(pokemon.id);
    if (pokemonDetails == null) {
      throw new Error("Pokemon not found");
    }
    if (pokemon1 === undefined) {
      setPokemon1(pokemonDetails);
    } else {
      setPokemon2(pokemonDetails);
    }
  }

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
    if (pokemon1 === undefined || pokemon2 === undefined) {
      throw new Error("Missing pokemon");
    }
    var selectedPokemon = pokemon.name === pokemon1.name ? pokemon2 : pokemon1;

    const damage = Math.min(
      selectedPokemon.hp,
      move.power * (Math.random() < move.successRate ? 1 : 0)
    );

    const newHealth = Math.max(0, selectedPokemon.hp - damage);

    setLog([
      ...log,
      `${pokemon.name} (${pokemon.hp}): ${damage} skade på ${selectedPokemon.name} (${newHealth})`,
    ]);

    pokemon.name === pokemon1.name
      ? setPokemon2({
          ...pokemon2,
          hp: newHealth,
        })
      : setPokemon1({
          ...pokemon1,
          hp: newHealth,
        });

    if (newHealth <= 0) {
      pokemon.name === pokemon1.name
        ? setPokemon2(undefined)
        : setPokemon1(undefined);
      setNewlyDefeated(
        pokemon.name === pokemon1.name
          ? structuredClone({ ...pokemon2, hp: 0, attack: undefined })
          : structuredClone({ ...pokemon1, hp: 0, attack: undefined })
      );
      setGameOver(true);
    }
  }

  function reset() {
    setGameOver(false);
    setLog([]);
  }

  return (
    <div className="flex flex-col">
      <div className="basis-1/2 text-center text-lg">
        <>
          <Spacer />
          <h1>
            {pokemon1?.name} VS {pokemon2?.name}
          </h1>
          <div className="flex justify-center bg-white gap-4 p-4">
            <Card
              fightAnimationLeft={leftAttacking}
              pokemon={pokemon1}
              attack={handleAttackClickLeftAnimation}
            />
            <Card
              fightAnimationRight={rightAttacking}
              pokemon={pokemon2}
              attack={handleAttackClickRightAnimation}
            />
          </div>
          <div className="rotate-90 inline-block">
            <Card hidePlaceholder pokemon={newlyDefeated} />
          </div>
        </>
        <ul className="bg-white p-4 mt-4 mb-4">
          {log.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-1 flex-wrap basis-1/2 justify-center">
        {pokemen.map((el) => {
          return (
            <button key={el.id} onClick={() => handleAddPokemon(el)}>
              <Card pokemon={el} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
