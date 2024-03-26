import { API } from '../../../api/service';
import { addRecord } from '../../../api/pocketbase';
import { filterRecordByHandle } from '../../../api/pocketbase';

export const retrieveToken = async ({ handleInput, queryClient }) => {
  await queryClient.fetchQuery({
    queryKey: ['token'],
    queryFn: async () => {
      return await filterRecordByHandle(handleInput);
    },
    staleTime: Infinity,
  });
};

const registerHandle = async (handle, faction) => {
  if (!handle || !faction) {
    return 'Handle or Faction cannot be undefined';
  }

  try {
    const startData = await API.agent.registerAgent(handle, faction);
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
