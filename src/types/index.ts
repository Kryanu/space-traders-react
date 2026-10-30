export interface Agent {
  accountId?: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}

export interface CargoItem {
  name: string;
  units: number;
  symbol?: string;
  description?: string;
}

export interface CargoData {
  inventory: CargoItem[];
  units: number;
  capacity: number;
}
export interface Trait {
  symbol: string;
  name: string;
}

export interface Waypoint {
  traits: Trait[];
  symbol: string;
  type: string;
}

export interface MapPoint {
  symbol: string;
  type: string;
  x: number;
  y: number;
  traits?: Trait[];
  systemSymbol?: string;
}

export interface Navigation {
  waypointSymbol: string;
  status: string;
  systemSymbol?: string;
}

export interface Fuel {
  current: number;
  capacity: number;
}

export interface Ship {
  cargo: CargoData;
  symbol: string;
  nav: Navigation;
  fuel: Fuel;
}

export interface MarketTrait {
  data: MarketItem[];
  title: string;
}

export interface MarketItem {
  name: string;
  symbol: string;
}

export interface Market {
  exchange: MarketItem[];
  exports: MarketItem[];
  imports: MarketItem[];
}

export interface ContractDeliverable {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

export interface Contract {
  id: string;
  accepted: boolean;
  terms: {
    payment: {
      onAccepted: number;
      onFulfilled: number;
    };
    deliver: ContractDeliverable[];
  };
}
