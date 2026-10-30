export interface Agent {
  headquarters: string;
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
  name: string;
}

export interface Waypoint {
  traits: Trait[];
  symbol: string;
  type: string;
}
export interface Ship {
  cargo: CargoData;
  symbol: string;
  nav: unknown;
  fuel: unknown;
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
