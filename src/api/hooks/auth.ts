import { useMutation, useQuery } from '@tanstack/react-query';
import Pocketbase from 'pocketbase';
import { Fetch } from '../http/http-client';

export interface AccountRegisterPayload {
  symbol: string;
  faction: string;
}

const pb = new Pocketbase(`http://127.0.0.1:8090`);
const agentsTable = 'agents';

function setToStorage(token: string) {
  sessionStorage.setItem('sessionToken', token);
}

export function useLogin(symbol: string) {
  return useQuery<string>({
    queryKey: ['login', symbol],
    enabled: !!symbol,
    staleTime: Infinity,
    queryFn: async () => {
      const { token } = await pb
        .collection(agentsTable)
        .getFirstListItem(pb.filter('symbol = {:symbol}', { symbol }));
      setToStorage(token);
      return token;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: AccountRegisterPayload) => {
      const res = await Fetch.post('register', payload);
      if (!res?.token || !res?.agent?.symbol) {
        throw new Error('Registration failed');
      }

      const { token, agent } = res;
      await pb.collection(agentsTable).create({ token, symbol: agent.symbol });
      setToStorage(token);
      return { token, symbol: agent.symbol as string };
    },
    onError: (error) => {
      console.error('[useRegister]: Error registering user', error);
    },
  });
}
