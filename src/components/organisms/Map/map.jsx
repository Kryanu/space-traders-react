import { List, ListItem, Typography } from '@mui/material';
import {
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../../context';
import { useQueryClient } from '@tanstack/react-query';

const customToolTip = ({ payload }) => {
  if (!Array.isArray(payload) || payload.length === 0) {
    return <></>;
  }
  const item = payload[0].payload;
  return (
    <div className='bg-blackie border-2 border-map-green text-map-green rounded-md'>
      <div style={{ padding: '16px' }}>
        <p style={{ paddingBottom: '8px' }}>{`Symbol:${item.symbol}`}</p>
        <p>{`Type:${item.type}`}</p>
      </div>
    </div>
  );
};

export default function Map({ data, title, activeShipLocation }) {
  const { setSelectedWaypoint } = useContext(GameContext);
  const [shipWaypoint, setShipWaypoint] = useState(activeShipLocation);

  const setNav = (waypoint) => {
    setSelectedWaypoint(waypoint);
    setShipWaypoint(waypoint.symbol);
  };

  const queryClient = useQueryClient();
  const ships = queryClient.getQueryData(['ships']) || [];

  const shipLocations = ships.map((ship) => {
    return ship.nav.waypointSymbol;
  });

  let currentWaypoint;
  let shipCurrentWaypoints;
  if (data && shipWaypoint) {
    currentWaypoint = [data.find((item) => item.symbol === shipWaypoint)];
    shipCurrentWaypoints = data.filter((waypoint) =>
      shipLocations.includes(waypoint.symbol),
    );
  }
  useEffect(() => {
    setShipWaypoint(activeShipLocation);
  }, [activeShipLocation]);

  if (!data) {
    return <></>;
  }
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
