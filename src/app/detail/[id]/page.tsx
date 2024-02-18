import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EditForm } from "@/components/EditForm";
import { Spacer } from "@/components/Spacer";
import { SubmitButton } from "@/components/SubmitButton";
import { prisma } from "@/storage/prisma";
import { redirect } from "next/navigation";
import sharp from "sharp";

export default async function Detail({ params }: { params: { id: string } }) {
  async function deletePokemon() {
    "use server";
    if (!params.id) {
      throw new Error("Missing params");
    }

    await prisma.pokemon.delete({
      where: {
        id: Number(params.id),
      },
    });
    redirect("/library");
  }

  async function updateImage(formData: FormData) {
    "use server";
    const { image } = {
      image: formData.get("image") as unknown as File,
    };

    console.log(params.id);

    if (!image) {
      throw new Error("No file uploaded");
    }

    if (!params.id) {
      throw new Error("Missing params");
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const resizedImage = await sharp(buffer, { failOn: "none" })
      .resize(280, 176)
      .toBuffer();

    const resizedImageWithPrefix = `data:image/png;base64,${resizedImage.toString(
      "base64"
    )}`;

    await prisma.pokemonImage.upsert({
      update: {
        pokemonId: Number(params.id),
        image: resizedImageWithPrefix,
      },
      create: {
        image: resizedImageWithPrefix,
        pokemonId: Number(params.id),
      },
      where: {
        pokemonId: Number(params.id),
      },
    });
  }

  async function getPokemon(id: number) {
    "use server";

    return prisma.pokemon.findFirst({
      where: {
        id,
      },
      include: {
        moves: true,
        image: true,
      },
    });
  }

  async function editPokemon(formData: FormData) {
    "use server";
    console.log("storing");

    const { name, health, move, moveId } = {
      name: formData.get("name"),
      health: formData.get("health"),
      move: formData.get("move"),
      moveId: formData.get("moveId"),
    };

    await prisma.pokemon.update({
      data: {
        name: name?.toString() ?? "",
        hp: Number(health?.toString()) ?? 0,
      },
      where: {
        id: Number(params.id),
      },
    });

    if (move) {
      await prisma.move.upsert({
        create: {
          successRate: 1,
          name: "Angrep",
          power: Number(move),
        },
        update: {
          power: Number(move),
        },
        where: {
          pokemonId: Number(params.id),
          id: Number(moveId),
        },
      });
    }
  }

  const pokemon = await getPokemon(Number(params.id));
  if (!pokemon) {
    return null;
  }

  return (
    <div className="bg-neutral-100 border-4 rounded p-4">
      <h1 className="text-center p-2 m-2 text-2xl">{pokemon.name}</h1>
      <div className="flex justify-center gap-4 flex-wrap">
        <Card key={pokemon.name} pokemon={pokemon} />
        <div>
          <EditForm editPokemon={editPokemon} pokemon={pokemon} />
          <Spacer />
          <hr />
          <Spacer />
          <form action={updateImage}>
            <h2>Oppdater bilde</h2>
            <input type="file" name="image" />
            <SubmitButton>Lagre bilde</SubmitButton>
          </form>
          <Spacer />
          <form action={deletePokemon}>
            <Button type="submit">Slett</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
