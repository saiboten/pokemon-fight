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

  console.log(currentAdversary);

  function handleFightOver(
    winner: PokemonWithMoveAndImage,
    loser: PokemonWithMoveAndImage
  ) {
    if (winner.name === currentPokemon.name) {
      if (adversaries.length - 1 === fightIndex) {
        return fightOver(winner);
      } else {
        const newFightIndex = fightIndex + 1;
        setFightIndex(newFightIndex);
        setCurrentAdversary(adversaries[newFightIndex]);
      }
    } else {
      return fightOver(loser);
    }
  }

  return (
    <div>
      <h1>{levelName}</h1>
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
