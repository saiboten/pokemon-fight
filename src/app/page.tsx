import { Pokemen } from "@/components/Game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-center p-2 m-2 text-2xl">Pokemon-kamp</h1>
        <Pokemen />
      </div>
    </main>
  );
}
