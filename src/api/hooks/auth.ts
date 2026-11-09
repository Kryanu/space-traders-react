import { useMutation, useQuery } from '@tanstack/react-query';
import { Fetch } from '../http/http-client';
import { useAuth } from '../../context/AuthContext';
import type { Agent } from '@types';

export interface AccountRegisterPayload {
  symbol: string;
  faction: string;
}

export function useAgentDetails(symbol: string, token?: string) {
  return useQuery<Agent>({
    queryKey: ['my/agent', symbol],
    enabled: !!token,
    staleTime: Infinity,
    queryFn: () => Fetch.get('my/agent', { Authorization: `Bearer ${token}` }),
  });
}

export function useRegister() {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: ({ symbol, faction }: AccountRegisterPayload) =>
      auth.register(symbol, faction),
    onError: (error) => {
      console.error('[useRegister]: Error registering user', error);
    },
  });
}
