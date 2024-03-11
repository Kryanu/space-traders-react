import { List, ListItem, ListItemText, Typography } from '@mui/material';
import {
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { NavigateButton } from '../../atoms';
import { isValidArray } from '../../../hooks';
import { Modal } from '../';
import { useState } from 'react';
import { Traits } from '../../molecules/';
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

const navigate = async ({ closeModal }) => {
  closeModal();
};

export default function Map(props) {
  const { data, title } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState({ traits: [] });
  const [isTraitsOpen, setIsTraitsOpen] = useState(false);

  const openModal = (waypoint) => {
    setIsTraitsOpen(false);
    setSelectedWaypoint(waypoint);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div className='flex flex-col grow items-start'>
        <Typography variant='h4' color={'#32C832'}>
          {`${title}`}
        </Typography>
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart width={900} height={700}>
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
              onClick={(waypoint) => {
                openModal(waypoint);
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='p-4 rounded-md bg-blackie border-2 border-map-green'>
          <Typography variant='h6' color={'#32C832'}>
            Do you want to fly to this waypoint?
          </Typography>
          <List>
            <ListItem
              sx={{ alignItems: 'start', color: '#32C832' }}
              className='flex flex-col border-2 rounded-md border-map-green mb-2'
            >
              <Traits
                waypoint={selectedWaypoint}
                isOpen={isTraitsOpen}
                setIsOpen={setIsTraitsOpen}
              />
            </ListItem>
          </List>
          <NavigateButton
            text={'View'}
            callBack={navigate}
            callBackProps={{
              closeModal,
            }}
            route={'/console/waypoint'}
            state={{ waypointSymbol: selectedWaypoint.symbol }}
          />
        </div>
      </Modal>
    </>
  );
}
