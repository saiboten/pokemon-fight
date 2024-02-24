import { useState } from "react";
import { PokemonNoId, PokemonWithMoveAndImage } from "./types";
import { Fight } from "./Fight";

interface Props {
  levelName: string;
  pokemon: Array<PokemonWithMoveAndImage>;
  adversaries: Array<PokemonNoId>;
  fightOver: (pokemen: PokemonWithMoveAndImage) => void;
}

export const Level = ({
  levelName,
  adversaries,
  fightOver,
  pokemon,
}: Props) => {
  const [fightIndex, setFightIndex] = useState(0);
  const [currentAdversary, setCurrentAdversary] = useState(adversaries[0]);
  const [currentPokemon, setCurrentPokemon] = useState(pokemon[0]);

  function handleFightOver(
    winner: PokemonWithMoveAndImage,
    loser: PokemonWithMoveAndImage
  ) {
    if (winner.name === currentPokemon.name) {
      if (adversaries.length - 1 === fightIndex) {
        return fightOver(winner);
      } else {
        const newFightIndex = fightIndex + 1;
        setCurrentPokemon(winner);
        setFightIndex(newFightIndex);
        setCurrentAdversary(adversaries[newFightIndex]);
      }
    } else {
      return fightOver(loser);
    }
  }

  return (
    <div>
      <div className="text-center mt-4 mb-4 text-sm rounded-full w-16 h-16 bg-teal-200 border-teal-400 border-4 flex justify-center items-center m-auto">
        {levelName}
      </div>
      <Fight
        key={fightIndex}
        ai
        initialPokemonLeft={currentPokemon}
        initialPokemonRight={currentAdversary}
        fightOver={handleFightOver}
      />
    </div>
  );
};
