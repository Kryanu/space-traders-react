import { retrieveWaypoints } from '../../../hooks';
import { API } from '../../../api/service';
import { navigateShip } from '../../../hooks/helpers';
export const retrieveAsteroids = async (token, system, setAsteroids) => {
  const data = await retrieveWaypoints(token, system, {
    type: 'ENGINEERED_ASTEROID',
  });
  setAsteroids(data);
};

export const retrieveWaypoint = async (
  systemSymbol,
  waypointSymbol,
  setWaypoint
) => {
  setWaypoint(await API.getWaypoint(systemSymbol, waypointSymbol));
};

export const orbitShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.orbitShip(token, shipSymbol);
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
    await API.dockShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Docking...' });
  } catch {}
};

export const refuelShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.refuelShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Refueling...' });
  } catch {}
};

export const mineAsteroid = async ({
  token,
  shipSymbol,
  setIsToastVisible,
}) => {
  try {
    await API.mineAsteroid(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Mining...' });
  } catch {}
};
