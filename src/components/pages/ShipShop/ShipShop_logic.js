import { API } from '../../../api/service';
import { isValidArray, retrieveWaypoints } from '../../../hooks';
import { TRAITS } from '../../../constants';
export const retrieveAllShips = async (token, system, setShips) => {
  const shipyards = await retrieveWaypoints(token, system, {
    traits: TRAITS.shipyard,
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

export const purchaseShip = async ({
  token,
  shipType,
  waypoint,
  updateShips,
  setIsToastVisible,
}) => {
  try {
    const data = await API.purchaseShip(token, shipType, waypoint);
    updateShips(data.ship);
    setIsToastVisible({
      isVisible: true,
      message: 'Ship Successfully Purchased',
    });
  } catch {}
};
