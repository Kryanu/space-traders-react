import { useState } from 'react';
import { NavigateButton } from '../../atoms';
import { handleLogin, handleSignUp } from './logic';
import { Button, TextField } from '@mui/material';

export const InitialComponents = (isSignUp, hooks) => {
  const { setHandle, setSignUp, setToken } = hooks;
  const [handleInput, setHandleInput] = useState(undefined);
  if (isSignUp) {
    return <></>;
  }

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
        <Button
          onClick={async () => setSignUp(true)}
          variant='contained'
          sx={{
            margin: 'auto',
          }}
        >
          Sign Up
        </Button>
        <NavigateButton
          isRendered={true}
          text={'Login'}
          callBack={handleLogin}
          callBackProps={{ handleInput, setToken, setHandle }}
          route={'/console'}
        />
      </div>
    </div>
  );
};

export const SignUpComponents = (isSignUp, hooks, state) => {
  const { setHandle, changeFaction, updateGame, setToken } = hooks;
  const { handle, faction } = state;
  if (!isSignUp) {
    return <></>;
  }

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
            changeFaction(e.target.value);
          }}
        />
      </div>
      <NavigateButton
        isRendered={true}
        text={'Start Trading'}
        callBack={handleSignUp}
        callBackProps={{ handle, faction, updateGame, setToken, setHandle }}
        route={'/console'}
      />
    </div>
  );
};
