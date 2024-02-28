import { API } from '../../../api/service';

export const retrieveContracts = async (token, setContracts) => {
  setContracts(await API.viewContracts(token));
};

export const setAgentDetails = async (token, setAgent) => {
  const res = await API.viewAgent(token);
  setAgent(res);
};
