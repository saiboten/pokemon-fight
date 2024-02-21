"use client";

import { useState } from "react";
import { Card } from "./Card";
import { Move } from "@prisma/client";
import { PokemonWithMove, PokemonWithMoveAndImage } from "./types";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import { Fight } from "./Fight";

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
        <div className="flex items-center justify-center gap-4 mb-4">
          <Card pokemon={pokemonLeft} />
          <span>VS</span>
          <Card pokemon={pokemonRight} />
        </div>

        <Button
          type="button"
          onClick={handleStartFight}
          disabled={pokemonLeft === undefined || pokemonRight === undefined}
        >
          Start
        </Button>
        <div className="mb-4"></div>
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
      <Card hidePlaceholder pokemon={winner} />
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

  function handleNewMatch() {
    if (pokemon1?.name === loser?.name) {
      setPokemon1(undefined);
    } else {
      setPokemon2(undefined);
    }
    setState("selectFighters");
  }

  return (
    <div className="flex flex-col">
      <div className="basis-1/2 text-center text-lg">
        <>
          <Spacer />
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
            newMatch={handleNewMatch}
            active={state === "fightOver"}
            winner={winner}
            loser={loser}
          />
        </>
      </div>
    </div>
  );
};
