"use client";
import Image from "next/image";
import { Move } from "@prisma/client";
import {
  PokemonWithMove,
  PokemonWithMoveAndImage,
  pokemonHasImage,
} from "./types";
import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  pokemon?: PokemonWithMoveAndImage | PokemonWithMove;
  hidePlaceholder?: boolean;
  attack?: (pokemon: PokemonWithMove, move: Move) => void;
  fightAnimationRight?: boolean;
  fightAnimationLeft?: boolean;
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
  attack?: (pokemon: PokemonWithMove, move: Move) => void;
}) => {
  if (!active) return null;
  return (
    <>
      {pokemon.moves?.map((move) => {
        return typeof attack === "function" ? (
          <button
            key={move.id}
            className="hover:bg-slate-200 text-left border p-2 rounded-sm border-zinc-100"
            onClick={() => attack(pokemon, move)}
          >
            {move.name} ({move.power} - {move.successRate})
          </button>
        ) : (
          <div key={move.id}>
            {move.name} ({move.power} - {move.successRate})
          </div>
        );
      })}
    </>
  );
};

export const Card = ({
  pokemon,
  attack,
  hidePlaceholder,
  fightAnimationLeft,
  fightAnimationRight,
}: CardProps) => {
  if (pokemon === undefined) {
    return hidePlaceholder ? null : <PlaceHolder />; // TODO maybe placeholder?
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      animate={{
        x: fightAnimationLeft
          ? [0, 100, 0, 0]
          : fightAnimationRight
          ? [0, -100, 0, 0]
          : 0,
        rotate: fightAnimationLeft
          ? [0, 30, 0, 0]
          : fightAnimationRight
          ? [0, -30, 0, 0]
          : 0,
      }}
      className="w-44 h-64 min-w-44 border-1 rounded bg-amber-300 border-amber-300 p-2 inline-block focus:ring focus:ring-violet-300 hover:ring"
    >
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
          {pokemonHasImage(pokemon) ? (
            <Image
              src={pokemon.image?.image ?? "/card-template.png"}
              alt="Image"
              width={280}
              height={176}
            ></Image>
          ) : (
            <Image
              src={"/card-template.png"}
              alt="Image"
              width={280}
              height={176}
            ></Image>
          )}
        </div>
        <div className="h-20 w-full flex justify-center flex-col text-sm p-2">
          <EmptyMoveSkeleton
            active={pokemon.moves === undefined || pokemon.moves.length === 0}
          />
          <Moves
            active={(pokemon.moves?.length ?? 0) > 0}
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
    </motion.div>
  );
};
