interface Navigation {
  waypointSymbol: string;
  status: string;
}

interface Fuel {
  current: number;
  capacity: number;
}

interface NavProps {
  nav: Navigation | null | undefined;
  fuel: Fuel;
}

export default function Nav({ nav, fuel }: NavProps) {
  if (!nav) return null;

  const { waypointSymbol, status } = nav;
  const { current, capacity } = fuel;

  return (
    <>
      <p>{`Waypoint: ${waypointSymbol}`}</p>
      <p>{`Status: ${status}`}</p>
      <p>{`Fuel: ${current} /${capacity}`}</p>
    </>
  );
}