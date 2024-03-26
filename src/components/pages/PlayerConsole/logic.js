import { API } from '../../../api/service';

export const retrieveContracts = async (token, setContracts) => {
  setContracts(await API.agent.viewContracts(token));
};

export const retrieveShips = async (token, updateShips) => {
  const data = await API.fleet.getShips(token);
  updateShips(data[0]);
};

export const setLocationDetails = (agent) => {
  if (agent && agent?.headquarters?.length > 0) {
    const locations = agent.headquarters.split('-');

    return {
      sector: locations[0],
      system: `${locations[0]}-${locations[1]}`,
      waypoint: agent.headquarters,
    };
  }
};

export const retrieveAgent = async (token) => {
  return await API.agent.viewAgent(token);
};

export const retrieveSystemsConfig = {
  queryKey: ['systems'],
  queryFn: async () => {
    return await API.system.listSystems();
  },
  staleTime: Infinity,
};
