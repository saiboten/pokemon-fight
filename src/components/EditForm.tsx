"use client";

import { Pokemon } from "@prisma/client";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";

export const EditForm = ({
  pokemon,
  editPokemon,
}: {
  pokemon: Pokemon;
  editPokemon: string | ((formData: FormData) => void) | undefined;
}) => {
  const [name, setName] = useState(pokemon.name);
  const [hp, setHp] = useState(pokemon.hp);

  return (
    <form
      className="flex flex-col justify-start items-start"
      action={editPokemon}
    >
      <div className="mb-4 flex gap-4 w-full">
        <span className="basis-20 p-1">Navn: </span>
        <input
          className="w-full p-1"
          type="text"
          autoComplete="off"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4 flex gap-4 w-full">
        <span className="basis-20 p-1">Helse: </span>
        <input
          className="w-full p-1"
          type="text"
          autoComplete="off"
          name="health"
          value={hp}
          onChange={(e) => setHp(Number(e.target.value))}
        />
      </div>
      <SubmitButton>Lagre endringer</SubmitButton>
      {/* <FeedbackComponent visible={!!feedback} text={feedback} /> */}
    </form>
  );
};
