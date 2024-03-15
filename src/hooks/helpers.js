import { API } from '../api/service';
import { filterRecordByHandle } from '../api/pocketbase';

export const isValidArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const display = (obj) => {
  if (obj) {
    console.log(obj);
  }
};

export const retrieveWaypoints = async (token, system, params) => {
  return await API.listWaypoints(token, system, params);
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const retrieveToken = async (handle, setToken) => {
  const data = await filterRecordByHandle(handle);
  setToken(data?.items[0]?.token);
};

export const navigateShip = async ({ token, shipSymbol, waypointSymbol }) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    return await API.fleet.navigateShip(token, shipSymbol, waypointSymbol);
  } catch {}
};

export const retrieveMapWaypoints = async (
  token,
  system,
  traits,
  updateWaypoints
) => {
  const { data, meta } = await API.system.listWaypoints(token, system, {
    limit: 20,
    page: 1,
    traits,
  });
  let waypoints = [...data];
  const pages = Math.ceil(meta.total / 20);
  if (pages < 2) {
    updateWaypoints(waypoints);
    return;
  }
  for (let i = 2; i <= pages; i++) {
    const waypointRes = await API.system.listWaypoints(token, system, {
      limit: 20,
      page: i,
    });
    waypoints = [...waypoints, ...waypointRes.data];
  }
  updateWaypoints(waypoints);
};

export const sellCargo = async ({ token, shipSymbol, cargo }) => {
  for (let i = 0; i < cargo.inventory.length; i++) {
    try {
      await API.fleet.sellCargo(token, shipSymbol, {
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
