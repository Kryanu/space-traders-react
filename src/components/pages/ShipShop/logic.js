import { API } from '../../../api/service';
import { isValidArray } from '../../../hooks';

export const setLocationDetails = (agent) => {
  if (agent && agent?.headquarters.length > 0) {
    const locations = agent.headquarters.split('-');

    return {
      sector: locations[0],
      system: `${locations[0]}-${locations[1]}`,
      waypoint: agent.headquarters,
    };
  }
};

const retrieveShipyards = async (token, system) => {
  return await API.listWaypoints(token, system, 'SHIPYARD');
};

export const retrieveAllShips = async (token, system, setShips) => {
  const shipyards = await retrieveShipyards(token, system);
  if (isValidArray(shipyards)) {
    const shipPromises = shipyards.map((shipyard) => {
      return API.getShipyard(token, system, shipyard.symbol);
    });
    const shipyardDetails = await Promise.all(shipPromises);
    const viableShipyards = shipyardDetails.filter(
      (shipyard) => shipyard?.ships
    );
    setShips(viableShipyards);
  }
};

export const purchaseShip = async ({token, shipType, waypoint}) => {
  await API.purchaseShip(token, shipType, waypoint);
};
