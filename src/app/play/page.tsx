import { Game } from "@/components/Game";
import { prisma } from "@/storage/prisma";

export default async function Page() {
  async function loadPokemon() {
    const firstPokemon = prisma.pokemon.findFirst({
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

  const pokemon = await loadPokemon();

  return (
    <div>
      <h1>Nå skal vi ut på eventyr!</h1>
      <Game selectedPokemon={pokemon} />
    </div>
  );
}
