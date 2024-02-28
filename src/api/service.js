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
  listWaypoints: async (token, system, traits) => {
    let url = `https://api.spacetraders.io/v2/systems/${system}/waypoints`;
    if (traits) {
      url = `https://api.spacetraders.io/v2/systems/${system}/waypoints?traits=${traits}`;
    }
    try {
      const res = await axios.get(url, {
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
    } catch (ex) {
      throw new Error(ex);
    }
  },
};
