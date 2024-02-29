import { API } from '../api/service';

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
