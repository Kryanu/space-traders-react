import { API } from '../../../api/service';
import { filterRecordByHandle } from '../../../api/pocketbase';

export const retrieveContracts = async (token) => {
  return await API.viewContracts(token);
};

export const retrieveToken = async (handle, changeToken) => {
  const data = await filterRecordByHandle(handle);
  changeToken(data?.items[0]?.token);
};

export const setAgentDetails = async (token, setAgent) => {
  const res = await API.viewAgent(token);
  setAgent(res);
};
