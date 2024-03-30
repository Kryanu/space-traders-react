import { API } from '../../../api/service';
import { navigateShip } from '../../../hooks/helpers';

export const retrieveWaypoint = async (
  systemSymbol,
  waypointSymbol,
  setWaypoint
) => {
  setWaypoint(await API.system.getWaypoint(systemSymbol, waypointSymbol));
};

const orbitShip = async ({ token, shipSymbol, setIsToastVisible }) => {
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
  setCurrentShip,
}) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const data = await navigateShip({ token, shipSymbol, waypointSymbol });
    await queryClient.invalidateQueries(['ships']);

    setCurrentShip(
      queryClient
        .getQueryData(['ships'])
        .find((ship) => ship.symbol === currentShip.symbol)
    );
    setTime(data.nav.route.arrival);
    setIsToastVisible({ isVisible: true, message: 'Navigation ongoing' });
  } catch {}
};

const dockShip = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.fleet.dockShip(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Docking...' });
  } catch {}
};

const refuelShip = async ({
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

const mineAsteroid = async ({ token, shipSymbol, setIsToastVisible }) => {
  try {
    await API.fleet.mineAsteroid(token, shipSymbol);
    setIsToastVisible({ isVisible: true, message: 'Mining...' });
  } catch (ex) {
    setIsToastVisible({ isVisible: true, message: ex.message });
  }
};

function viewShips({ setModalType, openModal }) {
  setModalType('shipyard');
  openModal(true);
}

export const actionsConfig = (
  actionProps,
  waypoint,
  setTime,
  shipWaypoint,
  setCurrentShip,
  currentShip,
  setModalType,
  openModal
) => {
  const shipyard = {
    text: 'View Ships',
    callBack: viewShips,
    callBackProps: { setModalType, openModal },
  };
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
    if (waypoint.traits.find((trait) => trait.symbol === 'SHIPYARD')) {
      actionRowConfig.push(shipyard);
    }
    return actionRowConfig.concat(actions);
  }
  return actionRowConfig;
};
