import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
} from '@mui/material';
import { Map } from '../../organisms';
import { NavigateButton } from '../../atoms';
import { MAPS } from '../../../constants';
import { useState, useContext } from 'react';
import { GameContext } from '../../../context';
export function AgentDetails(props) {
  const { agent } = props;
  const { currentShip } = useContext(GameContext);
  if (!agent || !currentShip) {
    return <></>;
  }
  return (
    <div className='flex flex-col rounded-md border-2 border-map-green p-4 mx-auto'>
      <Typography
        color={'#32C832'}
        variant='h6'
      >{`Symbol: ${agent.symbol}`}</Typography>
      <Typography
        color={'#32C832'}
        variant='h6'
      >{`HQ Coordinates: ${agent.headquarters}`}</Typography>
      <Typography
        color={'#32C832'}
        variant='h6'
      >{`Credits: ${agent.credits}`}</Typography>
      <Typography
        color={'#32C832'}
        variant='h6'
      >{`Faction: ${agent.startingFaction}`}</Typography>
      <Typography
        color={'#32C832'}
        variant='h6'
      >{`Ships: ${agent.shipCount}`}</Typography>
      <Typography
        color={'#32C832'}
        variant='h6'
      >{`Current Ship: ${currentShip.symbol}`}</Typography>
    </div>
  );
}

export function ContractIdList(props) {
  const { contracts, setContractId } = props;
  if (!Array.isArray(contracts) || contracts.length === 0) {
    return <></>;
  }

  const data = contracts.map((x) => {
    return (
      <ListItem
        sx={{ alignItems: 'start', color: '#32C832' }}
        className='flex flex-col border-2 rounded-md border-map-green mb-2'
        key={x.id}
      >
        <ListItemText>{`Payment on Accepted: ${x.terms?.payment?.onAccepted}`}</ListItemText>
        <ListItemText>{`Payment when Fulfilled: ${x.terms?.payment?.onFulfilled}`}</ListItemText>
        <ListItemButton
          onClick={() => {
            setContractId(x.id);
          }}
        >
          <ListItemText primary='View Details' />
        </ListItemButton>
      </ListItem>
    );
  });

  return <List sx={{ paddingTop: '0px' }}>{data}</List>;
}

export function NavigationButtons(props) {
  const { openModal } = props;
  return (
    <div className='flex'>
      <NavigateButton
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0.75rem',
        }}
        text={'Go Ship Shopping'}
        route={'/console/ship-shop'}
      />
      <NavigateButton
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0.75rem',
        }}
        text={'Go To Market'}
        route={'/console/market'}
      />
      <Button
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0.75rem',
        }}
        onClick={() => {
          openModal(true);
        }}
      >
        Select Ship
      </Button>
    </div>
  );
}

export function MapSelector(props) {
  const [selectedMap, setSelectedMap] = useState(MAPS.waypoints);
  const { systems, waypoints } = props;

  if (!selectedMap || !systems || !waypoints) return <></>;
  let selectedType;
  let selectedTitle;
  switch (selectedMap) {
    case MAPS.systems:
      selectedType = systems;
      selectedTitle = 'Systems Map';
      break;
    case MAPS.waypoints:
      selectedType = waypoints;
      selectedTitle = 'Waypoints Map';
      break;
    default:
      return <></>;
  }

  return (
    <div className='flex flex-col grow space-y-4 border-l-4 border-l-map-green pl-8'>
      <div className='flex items-start space-x-2 border-2 border-green-700 p-2 rounded-md mr-auto'>
        <Button
          onClick={() => {
            setSelectedMap(MAPS.systems);
          }}
        >
          View Systems
        </Button>
        <Button
          onClick={() => {
            setSelectedMap(MAPS.waypoints);
          }}
        >
          View Waypoints
        </Button>
      </div>
      <Map data={selectedType} title={selectedTitle} />
    </div>
  );
}
