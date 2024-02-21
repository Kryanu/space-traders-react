import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const addRecord = async (handle, token) => {
  if (handle) {
    try {
      await pb.collection('players').create({ handle, token });
    } catch (ex) {
      console.error(ex);
    }
  }
};

export const filterRecordByHandle = async (handle) => {
    if(handle) {
        try {
            return await pb.collection('players').getList(1,1,{
                filter: `handle = '${handle}'`
            });
        }catch (ex) {
            console.error(ex);
        }
    }
}