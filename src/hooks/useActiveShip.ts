import { useShip, useShips, useWaypoint } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';

export function useActiveShip() {
  const { token, isAuth } = useAuth();
  const { activeShipSymbol } = useGame();
  const ships = useShips(token ?? '');

  const fleet = ships.data?.data ?? [];
  // Default to the first ship until one is picked.
  const shipSymbol = activeShipSymbol ?? fleet[0]?.symbol;
  const shipQuery = useShip(shipSymbol);
  const ship = shipQuery.data ?? fleet.find((s) => s.symbol === shipSymbol);

  return { isAuth, fleet, ship };
}

export function useCurrentWaypoint() {
  const { ship } = useActiveShip();

  return useWaypoint(
    ship?.nav
      ? {
          systemSymbol: ship.nav.systemSymbol,
          waypointSymbol: ship.nav.waypointSymbol,
        }
      : undefined,
  );
}
