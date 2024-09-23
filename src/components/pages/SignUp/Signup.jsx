import { TextField } from '@mui/material';
import { useState } from 'react';
import { addRecord } from '../../../api/pocketbase';
import { API } from '../../../api/service';
import { NavigateButton } from '../../atoms/index.js';
import { retrieveToken } from '../../organisms/Start/logic.js';
import { useQueryClient } from '@tanstack/react-query';

const registerHandle = async ({ handle, faction, queryClient }) => {
  if (!handle || !faction) {
    return 'Handle or Faction cannot be undefined';
  }

  try {
    const startData = await API.agent.registerAgent(handle, faction);
    await addRecord(handle, startData?.token);
  } catch (ex) {
    console.error(ex);
  }
  await retrieveToken({ handleInput: handle, queryClient });
};

export function SignUp() {
  const [handle, setHandle] = useState(undefined);
  const [faction, setFaction] = useState(undefined);
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
        isRendered={true}
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
