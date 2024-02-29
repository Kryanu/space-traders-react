import { API } from '../../../api/service';
import { isValidArray, retrieveWaypoints } from '../../../hooks';

export const retrieveAllShips = async (token, system, setShips) => {
  const shipyards = await retrieveWaypoints(token, system, {
    traits: 'SHIPYARD',
  });
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

export const purchaseShip = async ({ token, shipType, waypoint, updateShips }) => {
  const data = await API.purchaseShip(token, shipType, waypoint);
  updateShips(data.ship);
};
