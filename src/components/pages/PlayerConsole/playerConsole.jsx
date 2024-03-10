import {
  retrieveContracts,
  retrieveShips,
  setAgentDetails,
  setLocationDetails,
  retrieveWaypoints,
} from './logic';
import { Button, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AgentDetails, ContractIdList, NavigationButtons } from './children';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Layouts/navbar';
import { TokenContext, GameContext } from '../../../context/';
import { Map } from '../../organisms/Map';

const MAPS = {
  systems: 'systems',
  waypoints: 'waypoints',
};

const renderMaps = (key, { systems, waypoints }) => {
  if (!key || !systems || !waypoints) return <></>;
  switch (key) {
    case MAPS.systems:
      return <Map data={systems} />;
    case MAPS.waypoints:
      return <Map data={waypoints} />;
    default:
      return <></>;
  }
};

export default function PlayerConsole() {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { agent, setAgent, location, setLocation, setShips, systems } =
    useContext(GameContext);

  const [selectedContractId, setContractId] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  const [waypoints, setWaypoints] = useState(undefined);

  const [selectedMap, setSelectedMap] = useState(MAPS.systems);

  useEffect(() => {
    if (location?.system) {
      retrieveWaypoints(token, location.system, setWaypoints);
    }
  }, [location]);

  useEffect(() => {
    if (!agent && token) {
      setAgentDetails(token, setAgent);
      retrieveContracts(token, setContracts);
      retrieveShips(token, setShips);
    } else if (!contracts && token) {
      retrieveContracts(token, setContracts);
    }
  }, [token]);

  useEffect(() => {
    if (!location && agent) {
      setLocation(setLocationDetails(agent));
    }
  }, [agent]);

  useEffect(() => {
    if (selectedContractId) {
      navigate(`/console/${selectedContractId}`, {
        state: { contractId: selectedContractId },
      });
    }
  }, [selectedContractId]);

  return (
    <div className='flex items-center space-x-4'>
      <div className='flex flex-col'>
        <NavBar route={'/'} />
        <div className='flex space-x-2'>
          <div className='flex flex-col'>
            <Typography variant='h5'>Agent Details:</Typography>
            <AgentDetails agent={agent} />
          </div>
          <div className='flex flex-col'>
            <Typography variant='h5'>Contracts:</Typography>
            <ContractIdList
              contracts={contracts}
              setContractId={setContractId}
            />
          </div>
        </div>
        <NavigationButtons />
      </div>
      <div className='flex flex-col space-y-4'>
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
        {renderMaps(selectedMap, { systems, waypoints })}
      </div>
    </div>
  );
}
