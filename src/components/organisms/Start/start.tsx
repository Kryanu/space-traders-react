import '../../../App.css';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { NavigateButton } from '../../atoms';
import { retrieveToken } from '../../../api/queries';
import { useQueryClient } from '@tanstack/react-query';

export default function Start() {
  const [handleInput, setHandleInput] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();

  return (
    <>
      <h2 color={'#32C832'} style={{ marginBottom: '2rem' }}>
        Space Traders
      </h2>

      <div className='flex flex-col space-y-4'>
        <TextField
          variant='outlined'
          label='Agent Handler'
          onChange={(e) => {
            setHandleInput(e.target.value);
          }}
        />
        <div className='flex'>
          <NavigateButton text={'Sign-Up'} route={'/sign-up'} />
          <NavigateButton text={'Sign-Up V2'} route={'/sign-up-v2'} />
          <NavigateButton text={'Console V2'} route={'/console-v2'} />
          <NavigateButton
            text={'Login'}
            callBack={retrieveToken}
            callBackProps={{
              handleInput,
              queryClient,
            }}
            route={'/console'}
          />
        </div>
      </div>
    </>
  );
}
//
