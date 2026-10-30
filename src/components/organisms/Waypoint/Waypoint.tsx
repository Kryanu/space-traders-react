import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { retrieveWaypoint } from './Waypoint_logic';
import { Waypoint } from './Waypoint_children';
import Countdown from '../../atoms/Countdown';
import './Waypoint.css';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { MODAL_TYPE } from '../../../constants';
import type { Waypoint as WaypointData } from '@types';

type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

interface LocationDetails {
  sector: string;
  system: string;
  waypoint: string;
}

interface WaypointsProps {
  waypointSymbol: string;
  location: LocationDetails | undefined;
  setModalType: Dispatch<SetStateAction<ModalType>>;
  openModal: (open: boolean) => void;
}

export default function Waypoints(props: WaypointsProps) {
  const { waypointSymbol, location, setModalType, openModal } = props;

  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const [waypoint, setWaypoint] = useState<WaypointData | undefined>(undefined);
  const [time, setTime] = useState<number | string>(0);
  useEffect(() => {
    if (token && location?.system && waypointSymbol) {
      retrieveWaypoint(location.system, waypointSymbol, setWaypoint);
    }
  }, [waypointSymbol]);

  if (!waypoint) return <></>;

  return (
    <div className='flex flex-col mt-4 p-4 rounded-md diagonal-line border-2 border-map-green'>
      <Waypoint
        asteroids={waypoint}
        setTime={setTime}
        setModalType={setModalType}
        openModal={openModal}
      />
      <Countdown arrival={time} />
    </div>
  );
}
