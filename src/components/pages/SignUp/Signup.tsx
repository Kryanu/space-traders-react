import { TextField } from '@mui/material';
import { useState } from 'react';
import { addRecord } from '../../../api/pocketbase';
import { API } from '../../../api/service';
import { retrieveToken } from '../../../api/queries.js';
import { NavigateButton } from '../../atoms/index.js';
import { useQueryClient } from '@tanstack/react-query';
import { isMockMode } from '../../../api/mode';
import type { QueryClient } from '@tanstack/react-query';

interface RegisterHandleProps {
  handle: string | undefined;
  faction: string | undefined;
  queryClient: QueryClient;
}

const registerHandle = async ({ handle, faction, queryClient }: RegisterHandleProps) => {
  if (!handle || !faction) {
    return 'Handle or Faction cannot be undefined';
  }

  try {
    const startData = await API.agent.registerAgent(handle, faction);
    if (!isMockMode()) {
      await addRecord(handle, startData?.token);
    }
  } catch (ex) {
    console.error(ex);
  }
  await retrieveToken({ handleInput: handle, queryClient });
};

export function SignUp() {
  const [handle, setHandle] = useState<string | undefined>(undefined);
  const [faction, setFaction] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex space-x-4'>
        <TextField
          variant='outlined'
          label='Agent Handler'
          onChange={(e) => {
            setHandle(e.target.value);
          }}
        />
        <TextField
          variant='outlined'
          label='Faction'
          onChange={(e) => {
            setFaction(e.target.value);
          }}
        />
      </div>

      <NavigateButton
        text={'Sign Up'}
        callBack={registerHandle}
        callBackProps={{
          handle,
          faction,
          queryClient,
        }}
        route={'/console'}
      />
    </div>
  );
}
