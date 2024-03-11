import { useContext, useEffect, useState } from 'react';
import { orbitShip, retrieveWaypoint } from './Waypoint_logic';
import { Waypoint } from './Waypoint_children';
import { NavBar } from '../../Layouts';
import Countdown from '../../atoms/Countdown';
import { TokenContext, GameContext } from '../../../context';
import { useLocation } from 'react-router-dom';

export default function AstroidMining() {
  const routerProps = useLocation();
  const { waypointSymbol } = routerProps.state;
  const { token } = useContext(TokenContext);
  const { location, currentShip } = useContext(GameContext);
  const [waypoint, setWaypoint] = useState(undefined);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (token && location?.system && currentShip && waypointSymbol) {
      retrieveWaypoint(location.system, waypointSymbol, setWaypoint);
      orbitShip({ token, shipSymbol: currentShip.symbol });
    }
  }, []);

  if (!waypoint) return <></>;

  return (
    <div className='flex flex-col'>
      <NavBar route={'/console'} />
      <Waypoint asteroids={waypoint} setTime={setTime} />
      <Countdown arrival={time} />
    </div>
  );
}
