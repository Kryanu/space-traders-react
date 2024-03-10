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
    return await API.navigateShip(token, shipSymbol, waypointSymbol);
  } catch {}
};
