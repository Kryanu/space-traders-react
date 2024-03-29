import axios from 'axios';
import { ERROR_MESSAGES } from './errorMappings';

export const fleet = {
  purchaseShip: async (token, shipType, waypointSymbol) => {
    try {
      const res = await axios.post(
        `https://api.spacetraders.io/v2/my/ships`,
        { shipType, waypointSymbol },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      return res?.data?.data || res?.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  orbitShip: async (token, shipSymbol) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/orbit`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (ex) {
      throw new Error(ex);
    }
  },
  getShips: async (token) => {
    try {
      const res = await axios.get(`https://api.spacetraders.io/v2/my/ships`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  navigateShip: async (token, shipSymbol, waypointSymbol) => {
    try {
      const res = await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/navigate`,
        { waypointSymbol: waypointSymbol },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
      return res.data.data || res.data || res;
    } catch (ex) {
      return res.data;
    }
  },
  dockShip: async (token, shipSymbol) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/dock`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (ex) {
      throw new Error(ex);
    }
  },
  getShipBySymbol: async (token, shipSymbol) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  refuelShip: async (token, shipSymbol) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/refuel`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (ex) {
      throw new Error(ERROR_MESSAGES[ex.response.data.error.code]);
    }
  },
  mineAsteroid: async (token, shipSymbol) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/extract`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (ex) {
      throw new Error(ERROR_MESSAGES[ex.response.data.error.code]);
    }
  },
  listShipCargo: async (token, shipSymbol) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/cargo`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  sellCargo: async (token, shipSymbol, cargo) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/ships/${shipSymbol}/sell`,
        { ...cargo },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );
    } catch (ex) {
      throw new Error(ex);
    }
  },
};