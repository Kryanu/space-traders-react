import { API } from '../../../api/service';

export const purchaseShip = async ({
  token,
  shipType,
  waypoint,
  updateShips,
  setIsToastVisible,
}) => {
  try {
    const data = await API.fleet.purchaseShip(token, shipType, waypoint);
    updateShips(data.ship);
    setIsToastVisible({
      isVisible: true,
      message: 'Ship Successfully Purchased',
    });
  } catch {}
};
