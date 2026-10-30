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
