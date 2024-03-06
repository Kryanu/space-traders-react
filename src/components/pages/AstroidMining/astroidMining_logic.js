import { retrieveWaypoints } from '../../../hooks';
import { API } from '../../../api/service';
import { delay } from '../../../hooks/helpers';
export const retrieveAsteroids = async (token, system, setAsteroids) => {
  const data = await retrieveWaypoints(token, system, {
    type: 'ENGINEERED_ASTEROID',
  });
  setAsteroids(data);
};

export const orbitShip = async ({ token, shipSymbol }) => {
  await API.orbitShip(token, shipSymbol);
};

export const navigateShip = async ({ token, shipSymbol, waypointSymbol }) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const data = await API.navigateShip(token, shipSymbol, waypointSymbol);
    return data.nav.route.arrival;
  } catch {}
};

export const dockShip = async ({ token, shipSymbol }) => {
  await API.dockShip(token, shipSymbol);
};

export const refuelShip = async ({ token, shipSymbol }) => {
  await API.refuelShip(token, shipSymbol);
};

export const mineAsteroid = async ({ token, shipSymbol }) => {
  await API.mineAsteroid(token, shipSymbol);
};
