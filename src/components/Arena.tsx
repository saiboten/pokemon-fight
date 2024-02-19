"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Move } from "@prisma/client";
import { PokemonWithMove, PokemonWithMoveAndImage } from "./types";
import { Spacer } from "./Spacer";
import { Button } from "./Button";

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
      <ul className="bg-white p-4 mt-4 mb-4">
        {log.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

interface Props {
  pokemen: Array<PokemonWithMove>;
  getPokemon: (id: number) => Promise<PokemonWithMoveAndImage | null>;
}

interface SelectFightersProps {
  active: boolean;
  pokemen: PokemonWithMove[];
  handleAddPokemon: (selected: PokemonWithMove) => void;
  handleStartFight: () => void;
  pokemonLeft?: PokemonWithMoveAndImage;
  pokemonRight?: PokemonWithMoveAndImage;
}

const SelectFighters = ({
  active,
  pokemen,
  handleAddPokemon,
  handleStartFight,
  pokemonLeft,
  pokemonRight,
}: SelectFightersProps) => {
  if (!active) return null;

  return (
    <div>
      <div>
        <Card pokemon={pokemonLeft} />
        <Card pokemon={pokemonRight} />

        <Button
          type="button"
          onClick={handleStartFight}
          disabled={pokemonLeft === undefined || pokemonRight === undefined}
        >
          Start
        </Button>
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

const FightOver = ({
  active,
  winner,
  loser,
  newMatch,
}: {
  active: boolean;
  winner?: PokemonWithMoveAndImage;
  loser?: PokemonWithMoveAndImage;
  newMatch: () => void;
}) => {
  if (!active) return null;

  return (
    <>
      <h1>Vinner: </h1>
      <Card hidePlaceholder pokemon={winner} />

      <h1>Taper:</h1>
      <div className="rotate-90 inline-block">
        <Card hidePlaceholder pokemon={loser} />
      </div>
      <Button onClick={newMatch}>Ny kamp</Button>
    </>
  );
};

export const Arena = ({ pokemen, getPokemon }: Props) => {
  const [winner, setWinner] = useState<PokemonWithMoveAndImage | undefined>();
  const [loser, setLoser] = useState<PokemonWithMoveAndImage | undefined>();

  const [state, setState] = useState<
    "selectFighters" | "fighting" | "fightOver"
  >("selectFighters");

  const [pokemon1, setPokemon1] = useState<
    PokemonWithMoveAndImage | undefined
  >();
  const [pokemon2, setPokemon2] = useState<
    PokemonWithMoveAndImage | undefined
  >();

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

  function handleStartFight() {
    setState("fighting");
  }

  function handleFightOver(
    winner: PokemonWithMoveAndImage,
    loser: PokemonWithMoveAndImage
  ) {
    console.log(winner, loser);
    setWinner(winner);
    setLoser(loser);
    setState("fightOver");
  }

  return (
    <div className="flex flex-col">
      <div className="basis-1/2 text-center text-lg">
        <>
          <Spacer />
          <h1>
            {pokemon1?.name} VS {pokemon2?.name}
          </h1>
          {state === "fighting" ? (
            <Fight
              fightOver={handleFightOver}
              initialPokemonLeft={pokemon1}
              initialPokemonRight={pokemon2}
            />
          ) : null}

          <SelectFighters
            pokemonLeft={pokemon1}
            pokemonRight={pokemon2}
            active={state === "selectFighters"}
            handleAddPokemon={handleAddPokemon}
            pokemen={pokemen}
            handleStartFight={handleStartFight}
          />

          <FightOver
            newMatch={() => setState("selectFighters")}
            active={state === "fightOver"}
            winner={winner}
            loser={loser}
          />
        </>
      </div>
    </div>
  );
};
