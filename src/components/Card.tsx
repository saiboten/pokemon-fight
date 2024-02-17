"use client";
import Image from "next/image";
import { Move, Pokemon } from "./types";
import { Button } from "./Button";

interface CardProps {
  pokemon?: Pokemon;
  // attack: (pokemon: Pokemon, move: Move) => void;
}

const EmptyMoveSkeleton = ({ active }: { active: boolean }) => {
  if (!active) return null;

  return <div className="">Ingen angrep</div>;
};

const Moves = ({
  active,
  pokemon,
}: // attack,
{
  active: boolean;
  pokemon: Pokemon;
  // attack: (pok: Pokemon, move: Move) => void;
}) => {
  if (!active) return null;
  return (
    <>
      {pokemon.moves.map((move, index) => {
        return (
          // onClick={() => attack(pokemon, move)}
          <div key={index}>
            {move.name} ({move.power} - {move.successRate})
          </div>
        );
      })}
    </>
  );
};

export const Card = ({ pokemon }: CardProps) => {
  if (pokemon === undefined) {
    return null; // TODO maybe placeholder?
  }

  return (
    <div className="w-44 h-64 min-w-44 border-1 rounded bg-amber-300 border-amber-300 p-2">
      <div className="bg-white h-60">
        <div className="flex justify-between text-[10px] pr-1 pl-1">
          <div>{pokemon.name}</div>
          <div className="flex items-center">
            <div className="text-[5px] mr-1 inline-block self-end">HP</div>
            <div className="self-end">{pokemon.health}</div>
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
          <Moves active={pokemon.moves?.length > 0} pokemon={pokemon} />
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
