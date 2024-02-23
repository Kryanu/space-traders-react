import { retrieveContracts, retrieveToken, setAgentDetails } from './logic';
import { Typography } from '@mui/material';
import { userDataStore } from '../../../stores';
import { useEffect, useState } from 'react';
import { AgentDetails, ContractIdList } from './children';
import { useNavigate } from 'react-router-dom';
export default function PlayerConsole() {
  const [contracts, setContracts] = useState(undefined);
  const [agent, setAgent] = useState(undefined);
  const { token, changeToken } = userDataStore();
  const [selectedContractId, setContractId] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // retrieveToken('AMD0101', changeToken);
      //if we auth the user we can create a token with the spacetraders token embedded into it
    }
  });

  useEffect(() => {
    if (!agent && token) {
      setAgentDetails(token, setAgent);
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
    <div className='flex flex-col'>
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
    </div>
  );
}
