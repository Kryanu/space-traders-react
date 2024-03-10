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
import { useState } from 'react';
export function AgentDetails(props) {
  const { agent } = props;
  if (!agent) {
    return <></>;
  }
  return (
    <div className='flex flex-col rounded-md border-2 border-slate-300 p-4 mx-auto'>
      <Typography variant='h6'>{`Symbol: ${agent.symbol}`}</Typography>
      <Typography variant='h6'>{`HQ Coordinates: ${agent.headquarters}`}</Typography>
      <Typography variant='h6'>{`Credits: ${agent.credits}`}</Typography>
      <Typography variant='h6'>{`Faction: ${agent.startingFaction}`}</Typography>
      <Typography variant='h6'>{`Ships: ${agent.shipCount}`}</Typography>
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
        sx={{ alignItems: 'start' }}
        className='flex flex-col border-2 rounded-md border-slate-300 mb-2'
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

export function NavigationButtons() {
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
        text={'Go Asteroid Mining'}
        route={'/console/astroid-mining'}
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
    <div className='flex flex-col space-y-4 border-l-4 border-l-map-green pl-8'>
      <div className='flex items-start space-x-2 border-2 border-green-700 p-2 rounded-md mr-auto'>
        <Button
          variant='contained'
          onClick={() => {
            setSelectedMap(MAPS.systems);
          }}
        >
          View Systems
        </Button>
        <Button
          variant='contained'
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
