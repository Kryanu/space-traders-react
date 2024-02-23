import { useEffect } from 'react';
import { userDataStore } from '../stores/userData';
import { filterRecordByHandle } from '../api/pocketbase';

export default function useToken() {
  const { token, changeToken } = userDataStore();
  const handle = window.sessionStorage.getItem('handle');
  const key = 'token';
  useEffect(() => {
    if (!token) {
      try {
        const localToken = window.sessionStorage.getItem(key);
        if (localToken && localToken !== 'undefined') {
          changeToken(localToken);
        } else {
          retrieveToken(handle, changeToken);
        }
        window.sessionStorage.setItem(key, token);
      } catch (ex) {
        console.error('No token was found');
      }
    }
  }, [handle]);
}

const retrieveToken = async (handle, changeToken) => {
  const data = await filterRecordByHandle(handle);
  changeToken(data?.items[0]?.token);
};
