import { useLogin, useShip, useShips, useWaypoint } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useSymbol } from '../context/SymbolContext';

export function useActiveShip() {
  const { symbol } = useSymbol();
  const { activeShipSymbol } = useGame();
  const login = useLogin(symbol);
  const ships = useShips(login.data ?? '');

  const fleet = ships.data?.data ?? [];
  // Default to the first ship until one is picked.
  const shipSymbol = activeShipSymbol ?? fleet[0]?.symbol;
  const shipQuery = useShip(shipSymbol);
  const ship = shipQuery.data ?? fleet.find((s) => s.symbol === shipSymbol);

  return { isAuth: !!login.data, fleet, ship };
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
