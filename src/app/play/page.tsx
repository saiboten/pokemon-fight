import { Game } from "@/components/Game";
import { prisma } from "@/storage/prisma";

export default async function Page() {
  async function loadPokemon() {
    const allPokemon = prisma.pokemon.findMany({
      include: {
        image: true,
        moves: true,
      },
    });

    if (!allPokemon) {
      throw new Error("No pokemon found");
    }
    return allPokemon;
  }

  const pokemen = await loadPokemon();

  const pokemon = pokemen.find((el) => el.id === 3);
  if (!pokemon) {
    throw new Error("Balla not found");
  }

  return <Game selectedPokemon={pokemon} pokemen={pokemen} />;
}
