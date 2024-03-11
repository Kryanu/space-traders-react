import { useContext, useEffect, useState } from 'react';
import { orbitShip, retrieveWaypoint } from './Waypoint_logic';
import { Waypoint } from './Waypoint_children';
import Countdown from '../../atoms/Countdown';
import { TokenContext, GameContext } from '../../../context';
import './Waypoint.css';
export default function Waypoints(props) {
  const { waypointSymbol } = props;

  const { token } = useContext(TokenContext);
  const { location, currentShip } = useContext(GameContext);
  const [waypoint, setWaypoint] = useState(undefined);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (token && location?.system && currentShip && waypointSymbol) {
      retrieveWaypoint(location.system, waypointSymbol, setWaypoint);
      orbitShip({ token, shipSymbol: currentShip.symbol });
    }
  }, [waypointSymbol]);

  if (!waypoint) return <></>;

  return (
    <div className='flex flex-col mt-4 p-4 rounded-md diagonal-line border-2 border-map-green'>
      <Waypoint asteroids={waypoint} setTime={setTime} />
      <Countdown arrival={time} />
    </div>
  );
}
