import { Game } from "@/components/Game";
import { prisma } from "@/storage/prisma";

export default async function Page() {
  async function loadPokemon() {
    const firstPokemon = prisma.pokemon.findMany({
      include: {
        image: true,
        moves: true,
      },
    });

    if (!firstPokemon) {
      throw new Error("No pokemon found");
    }
    return firstPokemon;
  }

  const pokemen = await loadPokemon();

  return (
    <div>
      <h1>Nå skal vi ut på eventyr!</h1>
      <Game selectedPokemon={pokemen[0]} pokemen={pokemen} />
    </div>
  );
}
