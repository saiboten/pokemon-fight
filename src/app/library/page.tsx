import { Card } from "@/components/Card";
import { LinkButton } from "@/components/LinkButton";
import { prisma } from "@/storage/prisma";
import Link from "next/link";

export default async function Library() {
  async function getPokemen() {
    "use server";

    return prisma.pokemon.findMany({
      include: {
        moves: true,
      },
    });
  }

  const pokemen = await getPokemen();

  return (
    <div className="bg-neutral-100 border-4 rounded p-4">
      <h1 className="text-center p-2 m-2 text-2xl">Alle pokemon</h1>
      <div className="flex gap-5 flex-wrap">
        {pokemen.map((pokemon) => {
          return (
            <Link key={pokemon.name} href={`/detail/${pokemon.id}`}>
              <Card
                pokemon={{
                  id: pokemon.id,
                  hp: pokemon.hp,
                  moves: pokemon.moves ?? [],
                  name: pokemon.name,
                }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
