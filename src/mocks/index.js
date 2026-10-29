const clone = (value) => JSON.parse(JSON.stringify(value));

const MOCK_TOKEN = 'mock-space-traders-token';

const systems = [
  { symbol: 'X1-DF55', sectorSymbol: 'X1', type: 'NEUTRON_STAR', x: 0, y: 0 },
  { symbol: 'X1-ZA32', sectorSymbol: 'X1', type: 'RED_STAR', x: 45, y: 18 },
  { symbol: 'X1-QB77', sectorSymbol: 'X1', type: 'BLUE_STAR', x: -32, y: 38 },
];

const waypoints = [
  {
    symbol: 'X1-DF55-A1', systemSymbol: 'X1-DF55', type: 'PLANET', x: 0, y: 0,
    traits: [{ symbol: 'MARKETPLACE', name: 'Marketplace' }, { symbol: 'SHIPYARD', name: 'Shipyard' }, { symbol: 'COMMON_METAL_DEPOSITS', name: 'Common Metal Deposits' }],
  },
  {
    symbol: 'X1-DF55-A2', systemSymbol: 'X1-DF55', type: 'ASTEROID_FIELD', x: 12, y: 8,
    traits: [{ symbol: 'COMMON_METAL_DEPOSITS', name: 'Common Metal Deposits' }, { symbol: 'RARE_METAL_DEPOSITS', name: 'Rare Metal Deposits' }],
  },
  {
    symbol: 'X1-DF55-A3', systemSymbol: 'X1-DF55', type: 'ORBITAL_STATION', x: -8, y: 16,
    traits: [{ symbol: 'MARKETPLACE', name: 'Marketplace' }],
  },
  {
    symbol: 'X1-DF55-A4', systemSymbol: 'X1-DF55', type: 'MOON', x: -18, y: -7,
    traits: [{ symbol: 'PRECIOUS_METAL_DEPOSITS', name: 'Precious Metal Deposits' }],
  },
  {
    symbol: 'X1-DF55-A5', systemSymbol: 'X1-DF55', type: 'JUMP_GATE', x: 20, y: -14,
    traits: [{ symbol: 'UNCHARTED', name: 'Uncharted' }],
  },
];

let agentSymbol = 'DEMO';
let agentFaction = 'COSMIC';
let agent = {
  accountId: 'mock-account',
  symbol: agentSymbol,
  headquarters: 'X1-DF55-A1',
  credits: 100000,
  startingFaction: agentFaction,
  shipCount: 1,
};

let ships = [
  {
    symbol: `${agentSymbol}-1`,
    registration: { name: 'Wayfarer', factionSymbol: agentFaction, role: 'COMMAND' },
    nav: {
      systemSymbol: 'X1-DF55',
      waypointSymbol: 'X1-DF55-A1',
      status: 'IN_ORBIT',
      flightMode: 'CRUISE',
      route: {
        destination: { symbol: 'X1-DF55-A1', type: 'PLANET' },
        departure: { symbol: 'X1-DF55-A1', type: 'PLANET' },
        arrival: '2026-10-18T12:00:00.000Z',
      },
    },
    fuel: { current: 100, capacity: 100 },
    cargo: {
      capacity: 40,
      units: 12,
      inventory: [{ symbol: 'IRON_ORE', name: 'Iron Ore', description: 'A common metal ore.', units: 12 }],
    },
  },
];

const contracts = [
  {
    id: 'mock-contract-1',
    factionSymbol: 'COSMIC',
    type: 'PROCUREMENT',
    accepted: false,
    terms: {
      payment: { onAccepted: 1200, onFulfilled: 4800 },
      deliver: [{ tradeSymbol: 'IRON_ORE', destinationSymbol: 'X1-DF55-A1', unitsRequired: 30, unitsFulfilled: 12 }],
    },
  },
];

const availableShips = [
  { type: 'SHIP_MINING_DRONE', name: 'Mining Drone', description: 'A compact mining vessel.', purchasePrice: 40000 },
  { type: 'SHIP_LIGHT_HAULER', name: 'Light Hauler', description: 'A reliable cargo ship.', purchasePrice: 80000 },
];

const market = {
  symbol: 'X1-DF55-A1',
  exports: [{ symbol: 'IRON_ORE', name: 'Iron Ore' }, { symbol: 'COPPER_ORE', name: 'Copper Ore' }],
  imports: [{ symbol: 'FUEL', name: 'Fuel' }],
  exchange: [{ symbol: 'FOOD', name: 'Food' }, { symbol: 'CLOTHING', name: 'Clothing' }],
};

const mockAgent = {
  registerAgent: async (symbol, faction) => {
    agentSymbol = symbol || 'DEMO';
    agentFaction = faction || 'COSMIC';
    agent = { ...agent, symbol: agentSymbol, startingFaction: agentFaction };
    ships = ships.map((ship, index) => ({
      ...ship,
      symbol: `${agentSymbol}-${index + 1}`,
      registration: { ...ship.registration, factionSymbol: agentFaction },
    }));
    return { token: MOCK_TOKEN, agent: clone(agent) };
  },
  viewContracts: async () => clone(contracts),
  viewAgent: async () => clone(agent),
  getContract: async (_token, contractId) => clone(contracts.find((item) => item.id === contractId)),
  acceptContract: async (_token, contractId) => {
    const contract = contracts.find((item) => item.id === contractId);
    if (contract) contract.accepted = true;
  },
  deliverContractGoods: async () => ({ contract: clone(contracts[0]), cargo: clone(ships[0].cargo) }),
  fulfillContract: async () => ({ contract: clone(contracts[0]) }),
};

const mockFleet = {
  purchaseShip: async (_token, shipType, waypointSymbol) => {
    const ship = {
      ...clone(ships[0]),
      symbol: `${agentSymbol}-${ships.length + 1}`,
      registration: { ...clone(ships[0].registration), role: shipType },
      nav: { ...clone(ships[0].nav), waypointSymbol },
    };
    ships.push(ship);
    agent.shipCount = ships.length;
    return { ship: clone(ship), agent: clone(agent) };
  },
  orbitShip: async (_token, shipSymbol) => {
    const ship = ships.find((item) => item.symbol === shipSymbol);
    if (ship) ship.nav.status = 'IN_ORBIT';
    return { ship: clone(ship) };
  },
  getShips: async () => clone(ships),
  navigateShip: async (_token, shipSymbol, waypointSymbol) => {
    const ship = ships.find((item) => item.symbol === shipSymbol);
    const destination = waypoints.find((item) => item.symbol === waypointSymbol);
    if (!ship || !destination) throw new Error('Mock ship or waypoint not found');
    ship.nav.waypointSymbol = waypointSymbol;
    ship.nav.systemSymbol = destination.systemSymbol;
    ship.nav.status = 'IN_TRANSIT';
    ship.nav.route.destination = { symbol: waypointSymbol, type: destination.type };
    ship.nav.route.arrival = new Date(Date.now() + 60000).toISOString();
    return { nav: clone(ship.nav) };
  },
  dockShip: async (_token, shipSymbol) => {
    const ship = ships.find((item) => item.symbol === shipSymbol);
    if (ship) ship.nav.status = 'DOCKED';
    return { ship: clone(ship) };
  },
  getShipBySymbol: async (_token, shipSymbol) => clone(ships.find((item) => item.symbol === shipSymbol)),
  refuelShip: async (_token, shipSymbol) => {
    const ship = ships.find((item) => item.symbol === shipSymbol);
    if (ship) ship.fuel.current = ship.fuel.capacity;
    return { ship: clone(ship), agent: clone(agent) };
  },
  mineAsteroid: async (_token, shipSymbol) => {
    const ship = ships.find((item) => item.symbol === shipSymbol);
    if (ship) {
      ship.cargo.inventory[0].units += 5;
      ship.cargo.units += 5;
    }
    return { ship: clone(ship), events: [] };
  },
  listShipCargo: async (_token, shipSymbol) => clone(ships.find((item) => item.symbol === shipSymbol)?.cargo),
  sellCargo: async (_token, shipSymbol, cargo) => {
    const ship = ships.find((item) => item.symbol === shipSymbol);
    const item = ship?.cargo.inventory.find((entry) => entry.symbol === cargo.symbol);
    if (item) {
      item.units = Math.max(0, item.units - cargo.units);
      ship.cargo.units = Math.max(0, ship.cargo.units - cargo.units);
    }
    return { agent: clone(agent), cargo: clone(ship?.cargo) };
  },
};

const mockSystem = {
  getWaypoint: async (_systemSymbol, waypointSymbol) => clone(waypoints.find((item) => item.symbol === waypointSymbol)),
  listWaypoints: async (_token, systemSymbol, params = {}) => {
    const filtered = waypoints.filter((item) => {
      const matchesSystem = !systemSymbol || item.systemSymbol === systemSymbol;
      const matchesTrait = !params.traits || item.traits.some((trait) => trait.symbol === params.traits);
      return matchesSystem && matchesTrait;
    });
    const limit = Number(params.limit) || filtered.length || 20;
    const page = Number(params.page) || 1;
    const start = (page - 1) * limit;
    return { data: clone(filtered.slice(start, start + limit)), meta: { total: filtered.length, page, limit } };
  },
  listSystems: async () => clone(systems),
  getShipyard: async () => ({ ships: clone(availableShips) }),
  getMarket: async () => clone(market),
};

export const mockAPI = { agent: mockAgent, fleet: mockFleet, system: mockSystem };
export { MOCK_TOKEN };

export const setMockAgentSymbol = (symbol) => {
  if (!symbol) return;
  agentSymbol = symbol;
  agent = { ...agent, symbol };
  ships = ships.map((ship, index) => ({ ...ship, symbol: `${symbol}-${index + 1}` }));
};