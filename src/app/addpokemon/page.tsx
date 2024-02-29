import { AddPokemonForm } from "@/components/AddPokemonForm";
import { prisma } from "@/storage/prisma";
import { Pokemon } from "@prisma/client/edge";
import sharp from "sharp";

export default function AddPokemonPage() {
  async function addPokey(formData: FormData) {
    "use server";

    const { name, hp, move, image, type } = {
      name: formData.get("name"),
      hp: formData.get("hp"),
      move: formData.get("move"),
      type: formData.get("type"),
      image: formData.get("image") as unknown as File,
    };

    // TODO 3: Utility types
    type PokemonWithoutId = Omit<Pokemon, "id">;

    const pokemon: PokemonWithoutId = {
      hp: Number(hp?.toString()) ?? 0,
      name: name?.toString() ?? "unset",
      type: type?.toString() ?? "water",
    };

    const res = await prisma.pokemon.create({
      data: {
        ...pokemon,
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
      <AddPokemonForm addPokey={addPokey} />
    </div>
  );
}
