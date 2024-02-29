"use client";
import { useForm } from "react-hook-form";
import { Types } from "./types";
import { SubmitButton } from "./SubmitButton";

type Inputs = {
  name: string;
  hp: number;
  type: Types;
  move: number;
};

type Props = {
  addPokey(formData: FormData): Promise<void>;
};

export const AddPokemonForm = ({ addPokey }: Props) => {
  const {
    watch,
    register,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  return (
    <form action={addPokey} className="flex flex-col justify-start items-start">
      <div className="mb-4 flex gap-4 w-full">
        <label htmlFor="name" className="basis-20">
          Navn:
        </label>
        <input
          id="name"
          className="w-full"
          type="text"
          autoComplete="off"
          {...register("name", { required: true })}
        />
      </div>
      {errors.name && (
        <div className="border-red-200 border-4 mt-2 mb-4 p-2">
          En pokemon må ha et navn
        </div>
      )}
      <div className="mb-4 flex gap-4 w-full">
        <span className="basis-20">Helse: </span>
        <input
          className="w-full"
          type="text"
          autoComplete="off"
          {...register("hp", {
            valueAsNumber: true,
          })}
        />
      </div>
      {errors.hp && (
        <div className="border-red-200 border-4 mt-2 mb-4 p-2">
          Må være tall
        </div>
      )}
      <div className="mb-4 flex gap-4 w-full">
        <span className="basis-20">Angrep: </span>
        <input
          className="w-full"
          type="text"
          autoComplete="off"
          {...register("move", { valueAsNumber: true })}
        />
      </div>
      <div className="mb-4 flex gap-4 w-full">
        <span className="basis-20">Type: </span>
        <input
          className="w-full"
          type="text"
          autoComplete="off"
          {...register("type")}
        />
      </div>
      <input type="file" name="image" />
      <SubmitButton>Legg til</SubmitButton>
    </form>
  );
};
