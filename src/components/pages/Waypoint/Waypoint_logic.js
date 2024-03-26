import { API } from '../../../api/service';
import { navigateShip } from '../../../hooks/helpers';

export const retrieveWaypoint = async (
  systemSymbol,
  waypointSymbol,
  setWaypoint
) => {
  setWaypoint(await API.system.getWaypoint(systemSymbol, waypointSymbol));
};

export const orbitShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.fleet.orbitShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Orbiting...' });
  } catch {}
};

const timedNavigateShip = async ({
  token,
  shipSymbol,
  waypointSymbol,
  setTime,
  setIsToastVisible,
  queryClient,
  currentShip,
  setCurrentShip
}) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const data = await navigateShip({ token, shipSymbol, waypointSymbol });
    await queryClient.invalidateQueries(['ships']);

    setCurrentShip(queryClient.getQueryData(['ships']).find(ship => ship.symbol === currentShip.symbol));
    setTime(data.nav.route.arrival);
    setIsToastVisible({ isVisible: true, message: 'Navigation ongoing' });
  } catch {}
};

export const dockShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.fleet.dockShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Docking...' });
  } catch {}
};

export const refuelShip = async ({
  token,
  shipSymbol,
  setIsToastVisible,
  queryClient,
}) => {
  try {
    await API.fleet.refuelShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Refueling...' });
    queryClient.invalidateQueries({ queryKey: ['agent'] });
    queryClient.invalidateQueries({ queryKey: ['ships'] });
  } catch (ex) {
    setIsToastVisible({ isVisible: true, message: ex.message });
  }
};

export const mineAsteroid = async ({
  token,
  shipSymbol,
  setIsToastVisible,
}) => {
  try {
    await API.fleet.mineAsteroid(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Mining...' });
  } catch (ex) {
    setIsToastVisible({ isVisible: true, message: ex.message });
  }
};
export const actionsConfig = (
  actionProps,
  waypoint,
  setTime,
  shipWaypoint,
  setCurrentShip,
  currentShip
) => {
  const actions = [
    {
      text: 'refuel Ship',
      callBack: refuelShip,
      callBackProps: { ...actionProps },
    },
    {
      text: 'Orbit',
      callBack: orbitShip,
      callBackProps: { ...actionProps },
    },
    {
      text: 'Mine Asteroid',
      callBack: mineAsteroid,
      callBackProps: { ...actionProps },
    },
    {
      text: 'Dock',
      callBack: dockShip,
      callBackProps: { ...actionProps },
    },
  ];

  let actionRowConfig = [
    {
      text: 'Fly To',
      callBack: timedNavigateShip,
      callBackProps: {
        waypointSymbol: waypoint.symbol,
        setTime,
        currentShip,
        setCurrentShip,
        ...actionProps,
      },
    },
  ];
  if (waypoint.symbol === shipWaypoint) {
    return actionRowConfig.concat(actions);
  }
  return actionRowConfig;
};
