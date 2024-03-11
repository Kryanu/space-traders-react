import { useContext, useEffect, useState } from 'react';
import { orbitShip, retrieveWaypoint } from './astroidMining_logic';
import { DisplayAsteroids } from './astroidMining_children';
import { NavBar } from '../../Layouts';
import Countdown from '../../atoms/Countdown';
import { TokenContext, GameContext } from '../../../context';
import { useLocation } from 'react-router-dom';
export default function AstroidMining() {
  const routerProps = useLocation();
  const { waypointSymbol } = routerProps.state;
  const { token } = useContext(TokenContext);
  const { location, ships } = useContext(GameContext);
  const [waypoint, setWaypoint] = useState(undefined);
  const [time, setTime] = useState(0);
  const renderCount = () => {
    if (time !== 0) {
      return <Countdown arrival={time} />;
    }
  };

  useEffect(() => {
    if (token && location?.system && ships && waypointSymbol) {
      retrieveWaypoint(location.system, waypointSymbol, setWaypoint);
      orbitShip({ token, shipSymbol: ships.symbol });
    }
  }, []);

  if (!waypoint) return <></>;

  return (
    <div className='flex flex-col'>
      <NavBar route={'/console'} />
      <DisplayAsteroids asteroids={waypoint} setTime={setTime} />
      {renderCount(time)}
    </div>
  );
}
