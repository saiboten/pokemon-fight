import Link from "next/link";

const routes = {
  overview: "/pokemon/overview",
  detail: "/pokemon/:id",
  battleArena: "/arena",
};

function Menu() {
  return (
    <ul>
      <Link href={routes.detail}>Detaljer</Link>
      <Link href={routes.battleArena}>Kamparena</Link>
      <Link href={routes.overview}>Oversikt</Link>
    </ul>
  );
}

type Routes = (typeof routes)[keyof typeof routes];

function navigate(path: Routes) {
  window.location.href = path;
}

navigate(""); // ?

function useTypes() {
  return [
    { name: "water", weakness: "grass" },
    { name: "grass", weakness: "fire" },
    { name: "fire", weakness: "water" },
  ];
}

function WeaknessTable() {
  const [water, grass, fire, rock] = useTypes();

  return (
    <div>
      <ul>
        <li>
          {water.name}: Weakness: {water.weakness}
          {grass.name}: Weakness: {grass.weakness}
          {fire.name}: Weakness: {fire.weakness}
          {rock.name}: Weakness: {rock.weakness}
        </li>
      </ul>
    </div>
  );
}
