import { SubmitButton } from "@/components/SubmitButton";

export default function AddPokemonPage() {
  async function addPokey(formData: FormData) {
    "use server";

    const rawFormData = {
      name: formData.get("name"),
      health: formData.get("health"),
    };

    console.log(rawFormData);

    // mutate data
    // revalidate cache
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-center p-2 m-2 text-2xl">Legg til kamp</h1>
        <form action={addPokey}>
          <input type="text" name="name" />
          <input type="text" name="health" />
          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
