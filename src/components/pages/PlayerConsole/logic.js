import { API } from '../../../api/service';

export const retrieveContracts = async (token, setContracts) => {
  setContracts(await API.viewContracts(token));
};

export const retrieveShips = async (token, updateShips) => {
  const data = await API.getShips(token);
  updateShips(data[0]);
};

export const retrieveWaypoints = async (token, system, updateWaypoints) => {
  updateWaypoints(
    await API.listWaypoints(token, system, { limit: 20, page: 5 })
  );
};
