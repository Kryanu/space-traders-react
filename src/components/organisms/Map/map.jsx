import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from 'recharts';
import { isValidArray } from '../../../hooks';
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
  if (!props) {
    return <></>;
  }
  const { data } = props;
  if (!data) {
    return <></>;
  }

  return (
    <div className='flex flex-col items-start'>
      <Typography variant='h4' color={'#32C832'}>
        Systems Map
      </Typography>
      <ScatterChart width={700} height={700}>
        <XAxis
          dataKey='x'
          tick={true}
          hide={true}
          axisLine={false}
          type='number'
          name='X'
        />
        <YAxis
          dataKey='y'
          tick={true}
          hide={true}
          axisLine={false}
          type='number'
          name='Y'
        />
        <Tooltip content={customToolTip} />
        <Scatter
          name='A school'
          data={data}
          fill='#32C832'
          onClick={(e) => {
            console.log(e);
          }}
        />
      </ScatterChart>
    </div>
  );
}
