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
    <div className="bg-neutral-100 border-4 rounded p-1">
      <h1 className="text-center text-2xl p-2">Alle pokemon</h1>
      <div className="flex gap-1 justify-center flex-wrap">
        {pokemen.map((pokemon) => {
          return (
            <Link key={pokemon.name} href={`/detail/${pokemon.id}`}>
              <Card pokemon={pokemon} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
