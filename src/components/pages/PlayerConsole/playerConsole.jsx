import {
  retrieveContracts,
  retrieveShips,
  setAgentDetails,
  setLocationDetails,
} from './logic';
import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AgentDetails, ContractIdList, NavigationButtons } from './children';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Layouts/navbar';
import { TokenContext, GameContext } from '../../../context/';

export default function PlayerConsole() {
  const [contracts, setContracts] = useState(undefined);
  const { token } = useContext(TokenContext);
  const { agent, setAgent, location, setLocation, setShips } =
    useContext(GameContext);
  const [selectedContractId, setContractId] = useState(undefined);
  const navigate = useNavigate();

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
    <div className='flex flex-col'>
      <NavBar route={'/'} />
      <div className='flex space-x-2'>
        <div className='flex flex-col'>
          <Typography variant='h5'>Agent Details:</Typography>
          <AgentDetails agent={agent} />
        </div>
        <div className='flex flex-col'>
          <Typography variant='h5'>Contracts:</Typography>
          <ContractIdList contracts={contracts} setContractId={setContractId} />
        </div>
      </div>
      <NavigationButtons />
    </div>
  );
}
