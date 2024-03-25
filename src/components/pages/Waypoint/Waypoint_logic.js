import { API } from '../../../api/service';
import { navigateShip } from '../../../hooks/helpers';

export const retrieveWaypoint = async (
  systemSymbol,
  waypointSymbol,
  setWaypoint
) => {
  setWaypoint(await API.system.getWaypoint(systemSymbol, waypointSymbol));
};

export const orbitShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.fleet.orbitShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Orbiting...' });
  } catch {}
};

export const timedNavigateShip = async ({
  token,
  shipSymbol,
  waypointSymbol,
  setTime,
  setIsToastVisible,
}) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const data = await navigateShip({ token, shipSymbol, waypointSymbol });
    setTime(data.nav.route.arrival);
    setIsToastVisible({ isVisible: true, message: 'Navigation ongoing' });
  } catch {}
};

export const dockShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.fleet.dockShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Docking...' });
  } catch {}
};

export const refuelShip = async ({
  token,
  shipSymbol,
  setIsToastVisible,
  queryClient,
}) => {
  try {
    await API.fleet.refuelShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Refueling...' });
    queryClient.invalidateQueries({ queryKey: ['agent'] });
  } catch (ex) {
    setIsToastVisible({ isVisible: true, message: ex.message });
  }
};

export const mineAsteroid = async ({
  token,
  shipSymbol,
  setIsToastVisible,
}) => {
  try {
    await API.fleet.mineAsteroid(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Mining...' });
  } catch (ex) {
    setIsToastVisible({ isVisible: true, message: ex.message });
  }
};
