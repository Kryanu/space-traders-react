import { userDataStore, gameDataStore } from '../../../stores';
import { Button, TextField } from '@mui/material';
import { registerHandle } from './logic';
import '../../../App.css';

export default function Start() {
  const { handle, changeHandle } = userDataStore();
  const { gameState, updateGame } = gameDataStore();

  return (
    <>
      <h1 className='mb-8'>Space Traders</h1>
      <div className='flex flex-col space-y-4'>
        <TextField
          variant='outlined'
          label='Agent Handler'
          onChange={(e) => {
            changeHandle(e.target.value);
          }}
        ></TextField>
        <Button
          onClick={async () =>
            updateGame(await registerHandle(handle, 'COSMIC'))
          }
          variant='contained'
          sx={{
            margin: 'auto',
          }}
        >
          Start Trading
        </Button>
      </div>
    </>
  );
}
