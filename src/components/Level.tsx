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

  function handleFightOver(
    winner: PokemonWithMoveAndImage,
    loser: PokemonWithMoveAndImage
  ) {
    console.log("winner", winner);
  }

  return (
    <div>
      <h1>{levelName}</h1>
      <Fight
        ai
        initialPokemonLeft={pokemon[0]}
        initialPokemonRight={currentAdversary}
        fightOver={handleFightOver}
      />
    </div>
  );
};
