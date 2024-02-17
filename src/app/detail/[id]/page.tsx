import { Card } from "@/components/Card";
import { EditForm } from "@/components/EditForm";
import { prisma } from "@/storage/prisma";

export default async function Detail({ params }: { params: { id: string } }) {
  async function getPokemon(id: number) {
    "use server";

    return prisma.pokemon.findFirst({
      where: {
        id,
      },
      include: {
        moves: true,
      },
    });
  }

  async function editPokemon(formData: FormData) {
    "use server";
    console.log("storing");

    const { name, health } = {
      name: formData.get("name"),
      health: formData.get("health"),
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
  }

  const pokemon = await getPokemon(Number(params.id));

  if (!pokemon) {
    return null;
  }

  return (
    <div className="bg-neutral-100 border-4 rounded p-4">
      <h1 className="text-center p-2 m-2 text-2xl">Alle pokemon</h1>
      <EditForm editPokemon={editPokemon} pokemon={pokemon} />
      <Card
        key={pokemon.name}
        pokemon={{
          id: pokemon.id,
          hp: pokemon.hp,
          moves: pokemon.moves ?? [],
          name: pokemon.name,
        }}
      />
    </div>
  );
}
