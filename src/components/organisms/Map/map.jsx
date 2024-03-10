import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  Collapse,
  Divider,
} from '@mui/material';
import { ScatterChart, XAxis, YAxis, Tooltip, Scatter } from 'recharts';
import { isValidArray } from '../../../hooks';
import { Modal } from '../';
import { useContext, useState } from 'react';
import { GameContext, TokenContext } from '../../../context';
import { navigateShip } from '../../../hooks/helpers';
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

function TraitDetails(props) {
  const { traits } = props;
  if (!isValidArray(traits)) return <></>;

  return traits.map((trait, index) => {
    return (
      <ListItem key={index}>
        <ListItemText primary={`${trait.name}`} />
      </ListItem>
    );
  });
}

export default function Map(props) {
  const { data, title } = props;
  const { ships } = useContext(GameContext);
  const { token } = useContext(TokenContext);
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
      <div className='flex flex-col items-start'>
        <Typography variant='h4' color={'#32C832'}>
          {`${title}`}
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
            onClick={(waypoint) => {
              openModal(waypoint);
            }}
          />
        </ScatterChart>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='p-4 rounded-md bg-blackie'>
          <Typography variant='h6' color={'#32C832'}>
            Do you want to fly to this waypoint?
          </Typography>
          <List>
            <ListItem
              sx={{ alignItems: 'start' }}
              className='flex flex-col border-2 rounded-md border-map-green mb-2'
            >
              <ListItemButton onClick={() => setIsTraitsOpen(!isTraitsOpen)}>
                <ListItemText primary='Traits' style={{ color: '#32C832' }} />
              </ListItemButton>
              <Collapse in={isTraitsOpen}>
                <Divider className='p-2' />
                <TraitDetails traits={selectedWaypoint.traits} />
              </Collapse>
            </ListItem>
          </List>
          <Button
            onClick={async () => {
              await navigateShip({
                token,
                shipSymbol: ships.symbol,
                waypointSymbol: selectedWaypoint.symbol,
              });
              closeModal();
            }}
          >
            Navigate
          </Button>
        </div>
      </Modal>
    </>
  );
}