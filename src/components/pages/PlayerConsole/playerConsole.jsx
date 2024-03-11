import { retrieveContracts, retrieveShips } from './logic';
import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {
  AgentDetails,
  ContractIdList,
  NavigationButtons,
  MapSelector,
} from './children';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Layouts/navbar';
import { TokenContext, GameContext } from '../../../context/';

export default function PlayerConsole() {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const { agent, setShips, systems, waypoints } = useContext(GameContext);
  const [selectedContractId, setContractId] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);

  useEffect(() => {
    if (token) {
      retrieveContracts(token, setContracts);
      retrieveShips(token, setShips);
    } else if (!contracts && token) {
      retrieveContracts(token, setContracts);
    }
  }, [token]);

  useEffect(() => {
    if (selectedContractId) {
      navigate(`/console/${selectedContractId}`, {
        state: { contractId: selectedContractId },
      });
    }
  }, [selectedContractId]);

  return (
    <div className='flex p-8 w-full h-screen space-x-4'>
      <div className='flex flex-col mb-auto pb-2 border-b-2 border-b-map-green'>
        <NavBar route={'/'} />
        <div className='flex space-x-2'>
          <div className='flex flex-col'>
            <Typography color={'#32C832'} variant='h5'>
              Agent Details:
            </Typography>
            <AgentDetails agent={agent} />
          </div>
          <div className='flex flex-col'>
            <Typography color={'#32C832'} variant='h5'>
              Contracts:
            </Typography>
            <ContractIdList
              contracts={contracts}
              setContractId={setContractId}
            />
          </div>
        </div>
        <NavigationButtons />
      </div>
      <MapSelector systems={systems} waypoints={waypoints} />
    </div>
  );
}
