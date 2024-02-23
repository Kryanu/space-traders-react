import { API } from '../../../api/service';
import { addRecord } from '../../../api/pocketbase';
import { filterRecordByHandle } from '../../../api/pocketbase';

export const registerHandle = async (handle, faction) => {
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

export const retrieveToken = async (handle) => {
  const data = await filterRecordByHandle(handle);
  return data?.items[0]?.token;
};

export const handleLogin = async ({ handleInput, changeToken, changeHandle }) => {
  try {
    changeToken(await retrieveToken(handleInput));
    changeHandle(handleInput);
    window.sessionStorage.setItem('handle', handleInput);
  } catch (ex) {
    throw new Error('Handle was incorrect');
  }
};
