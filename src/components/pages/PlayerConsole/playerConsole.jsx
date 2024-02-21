import { retrieveContracts, setAgentDetails, retrieveToken } from './logic';
import { Button } from '@mui/material';
import { userDataStore } from '../../../stores';
import { useEffect, useState } from 'react';


export default function PlayerConsole(props) {
  const [contracts, setContracts] = useState(undefined);
  const [agent, setAgent] = useState(undefined);
  const { token, changeToken } = userDataStore();
  useEffect(() => {
    if (!token) {
      retrieveToken('AMD1111', changeToken);
    }
  }, []);

  useEffect(() => {
    if (!agent && token) {
      setAgentDetails(token, setAgent);
    }
  }, [token]);
  
  return (
    <>
      <Button
        onClick={async () => {
          setContracts(await retrieveContracts(token));
        }}
        variant='contained'
        sx={{
          margin: 'auto',
        }}
      >
        View Contracts
      </Button>
    </>
  );
}
