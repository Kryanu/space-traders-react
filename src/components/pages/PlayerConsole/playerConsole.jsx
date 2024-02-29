import {
  retrieveContracts,
  retrieveShips,
  setAgentDetails,
  setLocationDetails,
} from './logic';
import { Typography } from '@mui/material';
import { userDataStore, gameDataStore } from '../../../stores';
import { useEffect, useState } from 'react';
import { AgentDetails, ContractIdList } from './children';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Layouts/navbar';
import { NavigateButton } from '../../atoms';
export default function PlayerConsole() {
  const [contracts, setContracts] = useState(undefined);
  const { token } = userDataStore();
  const { agent, updateAgent, location, updateLocation, ships, updateShips } = gameDataStore();
  const [selectedContractId, setContractId] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!agent && token) {
      setAgentDetails(token, updateAgent);
      retrieveContracts(token, setContracts);
      retrieveShips(token, updateShips)
    } else if (!contracts && token) {
      retrieveContracts(token, setContracts);
    }
  }, [token]);

  useEffect(() => {
    if (!location && agent) {
      updateLocation(setLocationDetails(agent));
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
    <div className='flex flex-col'>
      <NavBar route={'/'} />
      <div className='flex space-x-2'>
        <div className='flex flex-col'>
          <Typography variant='h5'>Agent Details:</Typography>
          {AgentDetails(agent)}
        </div>
        <div className='flex flex-col'>
          <Typography variant='h5'>Contracts:</Typography>
          {ContractIdList(contracts, setContractId)}
        </div>
      </div>
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
    </div>
  );
}
