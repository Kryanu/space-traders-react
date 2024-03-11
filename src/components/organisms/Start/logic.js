import { API } from '../../../api/service';
import { addRecord } from '../../../api/pocketbase';
import { filterRecordByHandle } from '../../../api/pocketbase';

export const retrieveToken = async (handle) => {
  const data = await filterRecordByHandle(handle);
  return data?.items[0]?.token;
};

const setAgentDetails = async (token, setAgent) => {
  const res = await API.viewAgent(token);
  setAgent(res);
};

export const handleLogin = async ({
  handleInput,
  setToken,
  setHandle,
  setAgent,
}) => {
  try {
    const token = await retrieveToken(handleInput);
    setToken(token);
    setHandle(handleInput);
    window.localStorage.setItem('handle', handleInput);
    await setAgentDetails(token, setAgent);
  } catch (ex) {
    throw new Error('Handle was incorrect');
  }
};

const registerHandle = async (handle, faction) => {
  if (!handle || !faction) {
    return 'Handle or Faction cannot be undefined';
  }

  try {
    const startData = await API.registerAgent(handle, faction);
    await addRecord(handle, startData?.token);
    return startData;
  } catch (ex) {
    console.error(ex);
  }
};

export const handleSignUp = async ({
  handle,
  faction,
  setHandle,
  setToken,
}) => {
  const data = await registerHandle(handle, faction);
  setToken(data.token);
  setHandle(handle);
  window.localStorage.setItem('handle', handle);
};
