import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Map } from '../../organisms';
import { MAPS, SELECTED_TRAITS } from '../../../constants';
import { useState, useEffect } from 'react';
import { retrieveMapWaypoints } from '../../../hooks/helpers';
import { toToken } from '../../../api/adapters';
import { useQueryClient } from '@tanstack/react-query';

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

function SelectionButtons(props) {
  const { setSelectedMap } = props;
  return (
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
  );
}

const mapDetails = (selectedMap, systems, waypoints) => {
  let type = waypoints;
  let title = 'Waypoints Map';

  if (selectedMap === MAPS.systems) {
    type = systems;
    title = 'Systems Map';
  }

  return {
    type,
    title,
  };
};

export default function MapSelector(props) {
  const [selectedMap, setSelectedMap] = useState(MAPS.waypoints);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const [filter, setFilter] = useState('');
  const { systems, waypoints, setWaypoints, currentShip } = props;

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

  const mapConfig = mapDetails(selectedMap, systems, waypoints);

  return (
    <div className='flex flex-col grow space-y-4 border-l-4 border-l-map-green pl-8'>
      <SelectionButtons setSelectedMap={setSelectedMap} />
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
          onClick={() => {
            setFilter('');
          }}
        >
          Reset
        </Button>
      </div>
      <Map
        data={mapConfig.type}
        title={mapConfig.title}
        activeShipLocation={currentShip?.nav?.waypointSymbol}
      />
    </div>
  );
}
