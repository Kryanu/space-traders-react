import { retrieveWaypoints } from '../../../hooks';
import { API } from '../../../api/service';
import { delay } from '../../../hooks/helpers';
export const retrieveAsteroids = async (token, system, setAsteroids) => {
  const data = await retrieveWaypoints(token, system, {
    type: 'ENGINEERED_ASTEROID',
  });
  setAsteroids(data);
};

export const orbitShip = async (token, shipSymbol) => {
  await API.orbitShip(token, shipSymbol);
};

export const navigateShip = async (token, shipSymbol, waypointSymbol) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    await API.navigateShip(token, shipSymbol, waypointSymbol);
  } catch {}
};

export const dockShip = async (token, shipSymbol) => {
  await API.dockShip(token, shipSymbol);
};

export const refuelShip = async (token, shipSymbol) => {
  await API.refuelShip(token, shipSymbol);
};

export const mineAsteroid = async (token, shipSymbol) => {
  await API.mineAsteroid(token, shipSymbol);
};

export const sellCargo = async (token, shipSymbol, cargo) => {
  debugger;
  for (let i = 0; i < cargo.inventory.length; i++) {
    try {
      await API.sellCargo(token, shipSymbol, {
        symbol: cargo.inventory[i].symbol,
        units: cargo.inventory[i].units,
      });
      await delay(2000);
    } catch {
      continue;
    }

    await delay(2000);
  }
  
};
