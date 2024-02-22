import { retrieveContracts, setAgentDetails, retrieveToken } from './logic';
import { Button, Typography } from '@mui/material';
import { userDataStore } from '../../../stores';
import { useEffect, useState } from 'react';


export default function PlayerConsole(props) {
  const [contracts, setContracts] = useState(undefined);
  const [agent, setAgent] = useState(undefined);
  const { token, changeToken } = userDataStore();

  useEffect(() => {
    if (!agent && token) {
      setAgentDetails(token, setAgent);
    }
  }, [token]);
  // Add box with current agent details
  return (
    <>
      <Typography
        variant='h6'
      >
        Patient no.9
      </Typography>
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
