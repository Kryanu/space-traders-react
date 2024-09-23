import '../../../App.css';
import { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { NavigateButton } from '../../atoms';
import { retrieveToken } from './logic';
import { useQueryClient } from '@tanstack/react-query';

function InitialComponents() {
  const [handleInput, setHandleInput] = useState(undefined);
  const queryClient = useQueryClient();

  return (
    <div className='flex flex-col space-y-4'>
      <TextField
        variant='outlined'
        label='Agent Handler'
        onChange={(e) => {
          setHandleInput(e.target.value);
        }}
      />
      <div className='flex'>
        <NavigateButton isRendered={true} text={'Sign-Up'} route={'/sign-up'} />
        <NavigateButton
          isRendered={true}
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
  );
}

export default function Start() {
  return (
    <>
      <Typography color={'#32C832'} sx={{ marginBottom: '2rem' }} variant='h2'>
        Space Traders
      </Typography>
      <InitialComponents />
    </>
  );
}
//
