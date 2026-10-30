export interface PurchaseShip {
  shipType: string;
  waypointSymbol?: string;
}

export interface ShipPayload {
  data: Ship[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface NavigatePayload {
  shipSymbol: string;
  waypointSymbol: string;
}

export interface ShipProps {
  isAuth: boolean;
}

export interface Ship {
  symbol: string;
  registration: {
    name: string;
    factionSymbol: string;
    role: string;
  };
  nav: ShipNav;
  crew: ShipCrew;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  cooldown: ShipCooldown;
  modules: ShipModule[];
  mounts: ShipMount[];
  cargo: ShipCargo;
  fuel: ShipFuel;
}

export interface ShipNav {
  systemSymbol: string;
  waypointSymbol: string;
  route: {
    destination: Record<string, unknown>;
    origin: Record<string, unknown>;
    departureTime: string;
    arrival: string;
  };
  status: 'IN_TRANSIT' | 'IN_ORBIT' | 'DOCKED';
  flightMode: string;
}

export interface ShipCrew {
  current: number;
  required: number;
  capacity: number;
  rotation: string;
  morale: number;
  wages: number;
}

export interface ShipFrame {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: {
    power: number;
    crew: number;
    slots: number;
  };
  quality: number;
}

export interface ShipReactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  powerOutput: number;
  requirements: {
    power: number;
    crew: number;
    slots: number;
  };
  quality: number;
}

export interface ShipEngine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  integrity: number;
  speed: number;
  requirements: {
    power: number;
    crew: number;
    slots: number;
  };
  quality: number;
}

export interface ShipCooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: string;
}

export interface ShipModule {
  symbol: string;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: {
    power: number;
    crew: number;
    slots: number;
  };
}

export interface ShipMount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits: string[];
  requirements: {
    power: number;
    crew: number;
    slots: number;
  };
}

export interface ShipCargo {
  capacity: number;
  units: number;
  inventory: CargoInventory[];
}

export interface CargoInventory {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

export interface ShipFuel {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: string;
  };
}

export interface NavigateResponse {
  fuel: {
    current: number;
    capacity: number;
    consumed: {
      amount: number;
      timestamp: string;
    };
  };
  nav: {
    systemSymbol: string;
    waypointSymbol: string;
    route: {
      destination: {
        symbol: string;
        type: string;
        systemSymbol: string;
        x: number;
        y: number;
      };
      origin: {
        symbol: string;
        type: string;
        systemSymbol: string;
        x: number;
        y: number;
      };
      departureTime: string;
      arrival: string;
    };
    status: string;
    flightMode: string;
  };
  events: ShipEvent[];
}

export interface ExtractResponse {
  cooldown: {
    shipSymbol: string;
    totalSeconds: number;
    remainingSeconds: number;
    expiration: string;
  };
  extraction: {
    shipSymbol: string;
    yield: {
      symbol: string;
      units: number;
    };
  };
  cargo: {
    capacity: number;
    units: number;
    inventory: CargoInventory[];
  };
  modifiers: ShipModifier[];
  events: ShipEvent[];
}

export interface ShipEvent {
  symbol: string;
  component: string;
  name: string;
  description: string;
}

export interface ShipModifier {
  symbol: string;
  name: string;
  description: string;
}

export interface PurchasableShip {
  type: string;
  name: string;
  description: string;
  supply: string;
  activity: string;
  purchasePrice: number;
  frame: ShipFrame;
  reactor: ShipReactor;
  engine: ShipEngine;
  modules: ShipModule[];
  mounts: ShipMount[];
  crew: {
    required: number;
    capacity: number;
  };
}

export interface ShipyardPayload {
  symbol: string;
  shipTypes: Array<{ type: string }>;
  transactions: ShipPurchaseTransaction[];
  ships: PurchasableShip[];
  modificationsFee: number;
}

export interface ShipPurchaseTransaction {
  waypointSymbol: string;
  shipSymbol: string;
  shipType: string;
  price: number;
  agentSymbol: string;
  timestamp: string;
}
