import { API } from '../../../api/service';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const addRecord = async (handle) => {
  if (handle) {
    try {
      await pb.collection('players').create({ handle });
    } catch (ex) {
      console.error(ex);
    }
  }
};

export const registerHandle = async (handle, faction) => {
  if (!handle || !faction) {
    return 'Handle or Faction cannot be undefined';
  }

  try {
    const startData = await API.registerAgent(handle, faction);
    await addRecord(handle);
    return startData;
  } catch (ex) {
    console.error(ex);
  }
};