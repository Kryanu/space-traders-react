import { API } from '../../../api/service';

export const retrieveContracts = async (token, setContracts) => {
  setContracts(await API.agent.viewContracts(token));
};

export const retrieveShips = async (token, updateShips) => {
  const data = await API.fleet.getShips(token);
  updateShips(data[0]);
};

export const retrieveWaypoints = async (token, system, updateWaypoints) => {
  updateWaypoints(
    await API.system.listWaypoints(token, system, { limit: 20, page: 5 })
  );
};
