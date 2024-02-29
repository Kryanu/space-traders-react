import { API } from '../../../api/service';

export const retrieveContracts = async (token, setContracts) => {
  setContracts(await API.viewContracts(token));
};

export const setAgentDetails = async (token, setAgent) => {
  const res = await API.viewAgent(token);
  setAgent(res);
};

export const setLocationDetails = (agent) => {
  if (agent && agent?.headquarters.length > 0) {
    const locations = agent.headquarters.split('-');

    return {
      sector: locations[0],
      system: `${locations[0]}-${locations[1]}`,
      waypoint: agent.headquarters,
    };
  }
};

export const retrieveShips = async (token, updateShips) => {
  const data = await API.getShips(token);
  updateShips(data[0]);
};
