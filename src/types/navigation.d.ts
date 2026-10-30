import type { WaypointTypes } from './waypointType';

export interface Waypoint {
  symbol: string;
  type: WaypointTypes;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: Orbital[];
  orbits: string;
  faction: {
    symbol: string;
  };
  traits: WaypointTrait[];
  modifiers: WaypointModifier[];
  chart: {
    waypointSymbol: string;
    submittedBy: string;
    submittedOn: string;
  };
  isUnderConstruction: boolean;
}

export interface Market {
  symbol: string;
  exports: MarketGood[];
  imports: MarketGood[];
  exchange: MarketGood[];
  transactions: MarketTransaction[];
  tradeGoods: TradeGood[];
}

export interface System {
  symbol: string;
  sectorSymbol: string;
  constellation: string;
  name: string;
  type: string;
  x: number;
  y: number;
  waypoints: Waypoint[];
  factions: Array<{ symbol: string }>;
}

export interface WaypointsPayload {
  data: Waypoint[];
  meta: Meta;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface Navigation {
  systemSymbol: string;
  waypointSymbol?: string;
  payload?: {
    traits?: string;
    limit?: number;
    page?: number;
    type?: string;
  };
}

export interface MarketGood {
  symbol: string;
  name: string;
  description: string;
}

export interface MarketTransaction {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: string;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: string;
}

export interface TradeGood {
  symbol: string;
  type: string;
  tradeVolume: number;
  supply: string;
  activity: string;
  purchasePrice: number;
  sellPrice: number;
}

export interface Orbital {
  symbol: string;
}

export interface WaypointTrait {
  symbol: string;
  name: string;
  description: string;
}

export interface WaypointModifier {
  symbol: string;
  name: string;
  description: string;
}
