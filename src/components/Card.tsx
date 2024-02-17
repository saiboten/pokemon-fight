"use client";
import Image from "next/image";
import { Button } from "./Button";
import { Move } from "@prisma/client";
import { PokemonWithMove } from "./types";

interface CardProps {
  pokemon?: PokemonWithMove;
  attack?: (pokemon: PokemonWithMove, move: Move) => void;
}

const EmptyMoveSkeleton = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return <div className="">Ingen angrep</div>;
};

const PlaceHolder = () => {
  return (
    <div className="w-48 h-64 border rounded-lg bg-cyan-800 inline-block"></div>
  );
};

const Moves = ({
  active,
  pokemon,
  attack,
}: {
  active: boolean;
  pokemon: PokemonWithMove;
  attack?: (pok: PokemonWithMove, move: Move) => void;
}) => {
  if (!active) return null;
  return (
    <>
      {pokemon.moves.map((move, index) => {
        return (
          <button
            key={index}
            onClick={() =>
              typeof attack === "function" ? attack(pokemon, move) : null
            }
          >
            {move.name} ({move.power} - {move.successRate})
          </button>
        );
      })}
    </>
  );
};

export const Card = ({ pokemon, attack }: CardProps) => {
  if (pokemon === undefined) {
    return <PlaceHolder />; // TODO maybe placeholder?
  }

  return (
    <div className="w-44 h-64 min-w-44 border-1 rounded bg-amber-300 border-amber-300 p-2 inline-block">
      <div className="bg-white h-60">
        <div className="flex justify-between text-[10px] pr-1 pl-1">
          <div>{pokemon.name}</div>
          <div className="flex items-center">
            <div className="text-[5px] mr-1 inline-block self-end">HP</div>
            <div className="self-end">{pokemon.hp}</div>
            <div className="inline-block bg-black rounded-full w-3 h-3 ml-1"></div>
          </div>
        </div>
        <div className="border-2 mr-1 ml-1">
          <Image
            src="/card-template.png"
            alt="Image"
            width={280}
            height={176}
          ></Image>
        </div>
        <div className="h-24 w-full flex justify-center flex-col text-sm p-2">
          <EmptyMoveSkeleton
            active={pokemon.moves === undefined || pokemon.moves.length === 0}
          />
          <Moves
            active={pokemon.moves?.length > 0}
            pokemon={pokemon}
            attack={attack}
          />
        </div>
        <div className="text-[5px] border rounded border-black h-2 bg-white"></div>
        <div className="text-[5px] h-6 bg-white flex justify-end p-1">
          Pokemon er best, ingen protest
        </div>
      </div>
      <div className="text-center text-[5px] w-full">
        @ 2022 Pokemon / Nintendo Creates / GAME FREAK
      </div>
    </div>
  );
};
