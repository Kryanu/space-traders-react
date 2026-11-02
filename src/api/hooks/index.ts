import { useQuery } from '@tanstack/react-query';
import { Fetch } from '../http/http-client';
import { ShipPayload } from '../../types/fleet';

export { useLogin, useRegister, useAgentDetails } from './auth';

export function useShips(token: string) {
  return useQuery<ShipPayload>({
    queryKey: ['my/agent'],
    enabled: !!token,
    queryFn: () => Fetch.get('my/ships', { Authorization: `Bearer ${token}` }),
    staleTime: Infinity,
  });
}
