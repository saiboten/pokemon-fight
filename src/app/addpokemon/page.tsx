import { SubmitButton } from "@/components/SubmitButton";
import { prisma } from "@/storage/prisma";
import Link from "next/link";

// const FeedbackComponent = ({
//   visible,
//   text,
// }: {
//   visible: boolean;
//   text: string;
// }) => {
//   if (!visible) return null;

//   return <p>{text}</p>;
// };

export default function AddPokemonPage() {
  async function addPokey(formData: FormData) {
    "use server";

    const { name, health, move } = {
      name: formData.get("name"),
      health: formData.get("health"),
      move: formData.get("move"),
    };

    console.log("Adding pokemon", name, health);

    await prisma.pokemon.create({
      data: {
        hp: Number(health?.toString()) ?? 0,
        name: name?.toString() ?? "unset",
        moves: {
          create: [
            {
              name: "Angrep",
              power: Number(move?.toString()) ?? 0,
              successRate: 1,
            },
          ],
        },
      },
    });

    // mutate data
    // revalidate cache
  }

  return (
    <div className="max-w-xl m-auto bg-neutral-100 border-4 rounded p-4">
      <h1 className="text-center p-2 m-2 text-2xl">Ny pokemon</h1>

      <form
        className="flex flex-col justify-start items-start"
        action={addPokey}
      >
        <div className="mb-4 flex gap-4 w-full">
          <span className="basis-20">Navn: </span>
          <input
            className="w-full"
            type="text"
            autoComplete="off"
            name="name"
          />
        </div>
        <div className="mb-4 flex gap-4 w-full">
          <span className="basis-20">Helse: </span>
          <input
            className="w-full"
            type="text"
            autoComplete="off"
            name="health"
          />
        </div>
        <div className="mb-4 flex gap-4 w-full">
          <span className="basis-20">Angrep: </span>
          <input
            className="w-full"
            type="text"
            autoComplete="off"
            name="move"
          />
        </div>
        <SubmitButton text="Legg til" />
        {/* <FeedbackComponent visible={!!feedback} text={feedback} /> */}
      </form>
    </div>
  );
}
