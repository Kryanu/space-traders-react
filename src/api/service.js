import axios from 'axios';
export const API = {
  registerAgent: async (symbol, faction) => {
    try {
      const res = await axios.post(
        'https://api.spacetraders.io/v2/register',
        JSON.stringify({ symbol, faction }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  viewContracts: async (token) => {
    try {
      const res = await axios.get(
        'https://api.spacetraders.io/v2/my/contracts',
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
  viewAgent: async (token) => {
    try {
      const res = await axios.get('https://api.spacetraders.io/v2/my/agent', {
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
  getContract: async (token, contractId) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/my/contracts/${contractId}`,
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
  acceptContract: async (token, contractId) => {
    try {
      const res = await axios.post(
        `https://api.spacetraders.io/v2/my/contracts/${contractId}/accept`,
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
  listWaypoints: async (token, system, params) => {
    let url = `https://api.spacetraders.io/v2/systems/${system}/waypoints`;
    try {
      const res = await axios.get(url, {
        params,
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
  listSystems: async () => {
    let url = `https://api.spacetraders.io/v2/systems`;
    try {
      const res = await axios.get(url);
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  getShipyard: async (token, system, waypoint) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/shipyard`,
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
      throw new Error(ex);
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
      throw new Error(ex);
    }
  },
  getMarket: async (token, system, waypoint) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/market`,
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
  deliverContractGoods: async (token, contractId, contractCargo) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/contracts/${contractId}/deliver`,
        { ...contractCargo },
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
  fulfillContract: async (token, contractId) => {
    try {
      return await axios.post(
        `https://api.spacetraders.io/v2/my/contracts/${contractId}/fulfill`,
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
};
