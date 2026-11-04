import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Fetch } from '../http/http-client';
import type {
  ExtractResponse,
  NavigateResponse,
  PurchaseShip,
  Ship,
  ShipPayload,
  ShipyardPayload,
} from '@types';

export function useShips(token: string) {
  return useQuery<ShipPayload>({
    queryKey: ['ships', token],
    enabled: !!token,
    queryFn: () => Fetch.get('my/ships', { Authorization: `Bearer ${token}` }),
    staleTime: Infinity,
  });
}

export function useShip(shipSymbol?: string) {
  return useQuery<Ship>({
    queryKey: ['ship', shipSymbol],
    enabled: !!shipSymbol,
    staleTime: Infinity,
    queryFn: () => Fetch.get(`my/ships/${shipSymbol}`),
  });
}

export function useShipyard(systemSymbol?: string, waypointSymbol?: string) {
  return useQuery<ShipyardPayload>({
    queryKey: ['shipyard', systemSymbol, waypointSymbol],
    enabled: !!systemSymbol && !!waypointSymbol,
    staleTime: Infinity,
    queryFn: () =>
      Fetch.get(`systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`),
  });
}

// Ship commands change nav, cargo, fuel and cooldowns, so refetch the ship afterwards.
function useShipCommand<TVars extends { shipSymbol: string }, TRes = unknown>(
  command: string,
  body: (vars: TVars) => unknown = () => ({}),
) {
  const queryClient = useQueryClient();

  return useMutation<TRes, Error, TVars>({
    mutationFn: (vars) =>
      Fetch.post(`my/ships/${vars.shipSymbol}/${command}`, body(vars)),
    onSuccess: (_res, { shipSymbol }) => {
      queryClient.invalidateQueries({ queryKey: ['ship', shipSymbol] });
      queryClient.invalidateQueries({ queryKey: ['ships'] });
      queryClient.invalidateQueries({ queryKey: ['my/agent'] });
    },
    onError: (error) => {
      console.error(`[useShipCommand:${command}]`, error);
    },
  });
}

interface ShipVars {
  shipSymbol: string;
}

export interface SellCargoVars extends ShipVars {
  cargoSymbol: string;
  units: number;
}

export interface NavigateVars extends ShipVars {
  waypointSymbol: string;
}

export const useDockShip = () => useShipCommand<ShipVars>('dock');
export const useOrbitShip = () => useShipCommand<ShipVars>('orbit');
export const useRefuelShip = () => useShipCommand<ShipVars>('refuel');

export const useNavigateShip = () =>
  useShipCommand<NavigateVars, NavigateResponse>(
    'navigate',
    ({ waypointSymbol }) => ({ waypointSymbol }),
  );

export const useExtractResources = () =>
  useShipCommand<ShipVars, ExtractResponse>('extract');

export const useSellCargo = () =>
  useShipCommand<SellCargoVars>('sell', ({ cargoSymbol, units }) => ({
    symbol: cargoSymbol,
    units,
  }));

export function usePurchaseShip() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, PurchaseShip>({
    mutationFn: (payload) => Fetch.post('my/ships', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ships'] });
      queryClient.invalidateQueries({ queryKey: ['my/agent'] });
    },
    onError: (error) => {
      console.error('[usePurchaseShip]', error);
    },
  });
}
