import { SubmitButton } from "@/components/SubmitButton";
import { prisma } from "@/storage/prisma";
import Link from "next/link";
import sharp from "sharp";

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

    const { name, health, move, image, type } = {
      name: formData.get("name"),
      health: formData.get("health"),
      move: formData.get("move"),
      type: formData.get("type"),
      image: formData.get("image") as unknown as File,
    };

    const res = await prisma.pokemon.create({
      data: {
        hp: Number(health?.toString()) ?? 0,
        name: name?.toString() ?? "unset",
        type: type?.toString() ?? "water",
        moves: {
          create: [
            {
              name: "Angrep",
              power: Number(move?.toString()) ?? 0,
              successRate: 1,
              type: type?.toString() ?? "water",
            },
          ],
        },
      },
    });

    if (image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const resizedImage = await sharp(buffer).resize(280, 176).toBuffer();

      const resizedImageWithPrefix = `data:image/png;base64,${resizedImage.toString(
        "base64"
      )}`;

      await prisma.pokemonImage.create({
        data: {
          image: resizedImageWithPrefix,
          pokemonId: res.id,
        },
      });
    }
  }

  return (
    <div className="max-w-xl m-auto bg-neutral-100 border-4 rounded p-4">
      <h1 className="text-center p-2 m-2 text-2xl">Ny pokemon</h1>

      <form
        action={addPokey}
        className="flex flex-col justify-start items-start"
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
        <div className="mb-4 flex gap-4 w-full">
          <span className="basis-20">Type: </span>
          <input
            className="w-full"
            type="text"
            autoComplete="off"
            name="move"
          />
        </div>
        <input type="file" name="image" />
        <SubmitButton>Legg til</SubmitButton>
        {/* <FeedbackComponent visible={!!feedback} text={feedback} /> */}
      </form>
    </div>
  );
}
