import { useContext, useEffect, useState } from 'react';
import { retrieveWaypoint } from './Waypoint_logic';
import { Waypoint } from './Waypoint_children';
import Countdown from '../../atoms/Countdown';
import { GameContext } from '../../../context';
import './Waypoint.css';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';

export default function Waypoints(props) {
  const { waypointSymbol, location, setModalType, openModal } = props;

  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const { currentShip } = useContext(GameContext);
  const [waypoint, setWaypoint] = useState(undefined);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (token && location?.system && currentShip && waypointSymbol) {
      retrieveWaypoint(location.system, waypointSymbol, setWaypoint);
    }
  }, [waypointSymbol]);

  if (!waypoint) return <></>;

  return (
    <div className='flex flex-col mt-4 p-4 rounded-md diagonal-line border-2 border-map-green'>
      <Waypoint asteroids={waypoint} setTime={setTime} setModalType={setModalType} openModal={openModal}/>
      <Countdown arrival={time} />
    </div>
  );
}
