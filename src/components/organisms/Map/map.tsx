import {
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { useContext, useEffect, useState } from 'react';
import { useGameContext } from '../../../context';
import { useQueryClient } from '@tanstack/react-query';
import type { TooltipProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import type { MapPoint, Ship } from '@types';

const customToolTip = ({
  payload,
}: TooltipProps<ValueType, NameType>) => {
  const item = payload?.[0]?.payload as MapPoint | undefined;
  if (!item) return null;
  return (
    <div className='bg-blackie border-2 border-map-green text-map-green rounded-md'>
      <div style={{ padding: '16px' }}>
        <p style={{ paddingBottom: '8px' }}>{`Symbol:${item.symbol}`}</p>
        <p>{`Type:${item.type}`}</p>
      </div>
    </div>
  );
};

interface MapProps {
  data: MapPoint[];
  title: string;
  activeShipLocation: string | undefined;
}

export default function Map({
  data,
  title,
  activeShipLocation,
}: MapProps) {
  const { setSelectedWaypoint } = useGameContext();
  const [shipWaypoint, setShipWaypoint] = useState(activeShipLocation);

  const setNav = (waypoint: MapPoint) => {
    setSelectedWaypoint({ ...waypoint, traits: waypoint.traits ?? [] });
    setShipWaypoint(waypoint.symbol);
  };

  const queryClient = useQueryClient();
  const ships = queryClient.getQueryData<Ship[]>(['ships']) ?? [];

  const shipLocations = ships.map((ship) => {
    return ship.nav.waypointSymbol;
  });

  const currentWaypoint = shipWaypoint
    ? data.filter((item) => item.symbol === shipWaypoint)
    : [];
  const shipCurrentWaypoints = data.filter((waypoint) =>
    shipLocations.includes(waypoint.symbol),
  );
  useEffect(() => {
    setShipWaypoint(activeShipLocation);
  }, [activeShipLocation]);
  return (
    <div className='flex flex-col grow items-start space-y-2'>
      <p style={{ color: '#32C832' }}>{`${title}`}</p>
      <ResponsiveContainer width='100%' height='100%'>
        <ScatterChart width={900} height={700}>
          <XAxis
            dataKey='x'
            tick={true}
            hide={false}
            axisLine={false}
            type='number'
            name='X'
            strokeDasharray='3 3'
          />
          <YAxis
            dataKey='y'
            tick={true}
            hide={false}
            axisLine={false}
            strokeDasharray='3 3'
            type='number'
            name='Y'
          />
          <Tooltip content={customToolTip} />
          <Scatter
            name='All waypoints'
            data={data}
            fill='#32C832'
            onClick={(waypoint) => {
              setNav(waypoint);
            }}
          />
          <Scatter
            name='Ship Locations'
            data={shipCurrentWaypoints}
            fill='#DEB223'
            onClick={(waypoint) => {
              setNav(waypoint);
            }}
          />
          <Scatter
            name='Current Ship waypoint'
            data={currentWaypoint}
            fill='#c832c8'
            onClick={(waypoint) => {
              setNav(waypoint);
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
