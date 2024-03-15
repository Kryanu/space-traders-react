import axios from 'axios';

export const system = {
  getWaypoint: async (system, waypoint) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}`
      );
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
  listWaypoints: async (token, system, params) => {
    let url = `https://api.spacetraders.io/v2/systems/${system}/waypoints`;
    try {
      const res = await axios.get(url, {
        params,
      });
      return res?.data || res;
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
  getMarket: async (token, system, waypoint) => {
    try {
      const res = await axios.get(
        `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/market`,
        {}
      );
      return res?.data?.data || res.data || res;
    } catch (ex) {
      throw new Error(ex);
    }
  },
};
