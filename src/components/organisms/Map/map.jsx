import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { isValidArray } from '../../../hooks';
import { useContext } from 'react';
import { GameContext } from '../../../context';

const customToolTip = (props) => {
  const { payload } = props;
  if (!isValidArray(payload)) {
    return <></>;
  }
  const item = payload[0].payload;
  return (
    <div className='bg-blackie border-2 border-map-green text-map-green rounded-md'>
      <List>
        <ListItem>
          <ListItemText>{`Symbol:${item.symbol}`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Type:${item.type}`}</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

export default function Map(props) {
  const { data, title } = props;
  const { setSelectedWaypoint } = useContext(GameContext);

  const setNav = (waypoint) => {
    setSelectedWaypoint(waypoint);
  };

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-col grow items-start space-y-2'>
        <Typography variant='h4' color={'#32C832'}>
          {`${title}`}
        </Typography>
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart width={900} height={700}>
            <XAxis
              dataKey='x'
              tick={true}
              hide={false}
              // axisLine={false}
              type='number'
              name='X'
              strokeDasharray='3 3'
            />
            <YAxis
              dataKey='y'
              tick={true}
              hide={false}
              // axisLine={false}
              strokeDasharray='3 3'
              type='number'
              name='Y'
            />
            <Tooltip content={customToolTip} />
            <Scatter
              name='A school'
              data={data}
              fill='#32C832'
              onClick={(waypoint) => {
                setNav(waypoint);
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
