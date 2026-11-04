import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Fetch } from '../http/http-client';
import type {
  Market,
  NavigationRequest,
  System,
  Waypoint,
  WaypointsPayload,
} from '@types';

export function useSystem(systemSymbol?: string) {
  return useQuery<System>({
    queryKey: ['system', systemSymbol],
    enabled: !!systemSymbol,
    staleTime: Infinity,
    queryFn: () => Fetch.get(`systems/${systemSymbol}`),
  });
}

export function useSystemWaypoints(navigation?: NavigationRequest) {
  return useQuery<WaypointsPayload>({
    queryKey: ['waypoints', navigation?.systemSymbol, navigation?.payload],
    enabled: !!navigation?.systemSymbol,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    queryFn: () =>
      Fetch.get(
        `systems/${navigation!.systemSymbol}/waypoints`,
        undefined,
        navigation!.payload,
      ),
  });
}

export function useWaypoint(navigation?: NavigationRequest) {
  return useQuery<Waypoint>({
    queryKey: [
      'waypoint',
      navigation?.systemSymbol,
      navigation?.waypointSymbol,
    ],
    enabled: !!navigation?.systemSymbol && !!navigation?.waypointSymbol,
    staleTime: Infinity,
    queryFn: () =>
      Fetch.get(
        `systems/${navigation!.systemSymbol}/waypoints/${navigation!.waypointSymbol}`,
      ),
  });
}

export function useMarket(
  waypointSymbol?: string,
  systemSymbol?: string,
  enabled = true,
) {
  return useQuery<Market>({
    queryKey: ['market', systemSymbol, waypointSymbol],
    enabled: enabled && !!waypointSymbol && !!systemSymbol,
    staleTime: Infinity,
    queryFn: () =>
      Fetch.get(`systems/${systemSymbol}/waypoints/${waypointSymbol}/market`),
  });
}
