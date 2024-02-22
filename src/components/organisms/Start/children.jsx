import { registerHandle, retrieveToken } from './logic';
import { Button, TextField } from '@mui/material';
export const InitialComponents = (isSignUp, hooks, state) => {
  if (isSignUp) {
    return <></>;
  }

  return (
    <div className='flex flex-col space-y-4'>
      <TextField
        variant='outlined'
        label='Agent Handler'
        onChange={(e) => {
          hooks.changeHandle(e.target.value);
        }}
      />
      <div className='flex'>
        <Button
          onClick={async () => hooks.setSignUp(true)}
          variant='contained'
          sx={{
            margin: 'auto',
          }}
        >
          Sign Up
        </Button>
        <Button
          onClick={async () =>
            hooks.changeToken(await retrieveToken(state.handle))
          }
          variant='contained'
          sx={{
            margin: 'auto',
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export const SignUpComponents = (isSignUp, hooks, state) => {
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
            hooks.changeHandle(e.target.value);
          }}
        />
        <TextField
          variant='outlined'
          label='Faction'
          onChange={(e) => {
            hooks.changeFaction(e.target.value);
          }}
        />
      </div>
      <Button
        onClick={async () =>
          hooks.updateGame(await registerHandle(state.handle, state.faction))
        }
        variant='contained'
        sx={{
          margin: 'auto',
        }}
      >
        Start Trading
      </Button>
    </div>
  );
};
