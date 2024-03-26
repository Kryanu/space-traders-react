import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Map } from '../../organisms';
import { MAPS, SELECTED_TRAITS } from '../../../constants';
import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../../context';
import { retrieveMapWaypoints } from '../../../hooks/helpers';
import { toToken } from '../../../api/adapters';
import { useQueryClient } from '@tanstack/react-query';
import { ShipViewer } from '../index';
import { MODAL_TYPE } from '../../../constants';

const detailMapping = {
  symbol: 'Symbol',
  headquarters: 'HQ Coordinates',
  credits: 'Credits',
  startingFaction: 'Faction',
  shipCount: 'Ships',
};

export function AgentDetails(props) {
  const { agent } = props;
  const { currentShip } = useContext(GameContext);

  if (!agent || !currentShip) {
    return <></>;
  }

  const keys = Object.keys(agent).filter((item) => item !== 'accountId');
  const details = keys.map((item, index) => {
    return (
      <Typography
        color={'#32C832'}
        variant='h6'
        key={index}
      >{`${detailMapping[item]}: ${agent[item]}`}</Typography>
    );
  });

  return (
    <div className='flex flex-col text-left rounded-md border-2 border-map-green p-4 '>
      {details}
    </div>
  );
}

function ContractIdList(props) {
  const { contracts } = props;
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
        <ListItemButton onClick={() => {}}>
          <ListItemText primary='View Details' />
        </ListItemButton>
      </ListItem>
    );
  });

  return <List sx={{ paddingTop: '0px' }}>{data}</List>;
}

export function NavigationButtons(props) {
  const { openModal, setModalType } = props;

  const modalConfig = [
    {
      label: 'Select Ship',
      action: () => {
        openModal(true);
        setModalType(MODAL_TYPE.ships);
      },
    },
    {
      label: 'View Contracts',
      action: () => {
        openModal(true);
        setModalType(MODAL_TYPE.contracts);
      },
    },
  ];

  const modalButtons = modalConfig.map((item, index) => {
    return (
      <Button
        key={index}
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0.75rem',
        }}
        onClick={() => item.action()}
      >
        {item.label}
      </Button>
    );
  });

  return (
    <div className='flex pb-2 border-b-2 border-map-green'>{modalButtons}</div>
  );
}

const FilterItems = () => {
  return SELECTED_TRAITS.map((item, index) => {
    return (
      <MenuItem
        sx={{ backgroundColor: '#121212', color: '#32C832' }}
        key={index}
        value={item}
      >{`${item}`}</MenuItem>
    );
  });
};

export function MapSelector(props) {
  const [selectedMap, setSelectedMap] = useState(MAPS.waypoints);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const { currentShip } = useContext(GameContext);
  const [filter, setFilter] = useState('');
  const { systems, waypoints, setWaypoints } = props;

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    if (currentShip?.nav?.systemSymbol) {
      retrieveMapWaypoints(
        token,
        currentShip.nav.systemSymbol,
        filter,
        setWaypoints
      );
    }
  }, [filter]);

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
      <div className='flex items-center mr-auto space-x-2'>
        <FormControl
          color='primary'
          sx={{ marginRight: 'auto', minWidth: 100 }}
        >
          <InputLabel sx={{ color: '#32C832', fontSize: '1.25rem' }}>
            Traits
          </InputLabel>
          <Select
            sx={{ color: '#32C832' }}
            onChange={handleChange}
            value={filter}
          >
            {FilterItems()}
          </Select>
        </FormControl>
        <Button
          onClick={async () => {
            setFilter('');
          }}
        >
          Reset
        </Button>
      </div>
      <Map data={selectedType} title={selectedTitle} />
    </div>
  );
}

export function ModalSelector(props) {
  const { type, closeModal, contracts, ships } = props;
  switch (type) {
    case MODAL_TYPE.ships:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Select a Ship</Typography>
          <ShipViewer ships={ships} closeModal={closeModal} />
        </div>
      );
    case MODAL_TYPE.contracts:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Select a Contract</Typography>
          <ContractIdList contracts={contracts} />
        </div>
      );
  }
  return <></>;
}
