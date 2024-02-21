import { API } from '../../../api/service';
import { addRecord } from '../../../api/pocketbase';

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

