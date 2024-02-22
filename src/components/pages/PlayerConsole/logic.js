import { API } from '../../../api/service';

export const retrieveContracts = async (token) => {
  return await API.viewContracts(token);
};

export const setAgentDetails = async (token, setAgent) => {
  const res = await API.viewAgent(token);
  setAgent(res);
};
