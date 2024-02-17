import { Arena } from "@/components/Arena";
import { prisma } from "@/storage/prisma";

export default async function Home() {
  async function getPokemen() {
    "use server";

    return await prisma.pokemon.findMany({
      include: {
        moves: true,
      },
    });
  }

  const pokemen = await getPokemen();

  return (
    <>
      <h1 className="text-center text-2xl">Pokemon-kamp</h1>
      <Arena pokemen={pokemen} />
    </>
  );
}
