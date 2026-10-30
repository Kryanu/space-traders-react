export type { AccountRegisterPayload, AgentPayload as Agent } from './account';
export type { Contract, ContractDeliverable } from './contracts';
export type {
  CargoInventory as CargoItem,
  ExtractResponse,
  NavigatePayload,
  NavigateResponse,
  PurchaseShip,
  PurchasableShip,
  Ship,
  ShipCooldown,
  ShipCrew,
  ShipEngine,
  ShipEvent,
  ShipFrame,
  ShipFuel as Fuel,
  ShipModule,
  ShipMount,
  ShipNav as Navigation,
  ShipPayload,
  ShipProps,
  ShipPurchaseTransaction,
  ShipReactor,
  ShipyardPayload,
} from './fleet';
export type {
  Market,
  MarketGood as MarketItem,
  MarketTransaction,
  Meta,
  Navigation as NavigationRequest,
  Orbital,
  System,
  TradeGood,
  Waypoint,
  WaypointModifier,
  WaypointTrait,
  WaypointsPayload,
} from './navigation';
export type { WaypointTypes } from './waypointType';

import type { ShipCargo } from './fleet';
import type {
  Market,
  System,
  Waypoint as ApiWaypoint,
  WaypointTrait,
} from './navigation';

export type CargoData = ShipCargo;
export type Trait = Pick<WaypointTrait, 'symbol' | 'name'> &
  Partial<Pick<WaypointTrait, 'description'>>;
export type WaypointSummary = Pick<ApiWaypoint, 'symbol'> & {
  type: string;
  traits: Trait[];
} & Partial<Pick<ApiWaypoint, 'systemSymbol' | 'x' | 'y'>>;
export type MapPoint = Pick<System, 'symbol' | 'type' | 'x' | 'y'> & {
  traits?: Trait[];
  systemSymbol?: string;
};
export type MarketTrait = {
  data: Market['exchange'];
  title: string;
};
