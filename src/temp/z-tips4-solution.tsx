import Link from "next/link";

const routes = {
  overview: "/overview",
  admin: {
    href: "/admin",
    protected: true,
  },
  details: "/pokemon/:id",
} as const;

function Menu() {
  return (
    <ul>
      <Link href={routes.overview}>Oversikt</Link>
      <Link href={routes.admin}>Admin</Link>
      <Link href={routes.details}>Detaljer</Link>
    </ul>
  );
}

function useTypes() {
  return [
    { name: "water", weakness: "grass" },
    { name: "grass", weakness: "fire" },
    { name: "fire", weakness: "water" },
  ] as const;
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
