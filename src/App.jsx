import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { API } from './api/service';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [data, setData] = useState(undefined);
  const [handle, sethandle] = useState(undefined);
  console.log(handle);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <h1 className='mb-8'>Space Traders</h1>
        <div className='flex flex-col space-y-4'>
          <TextField
            variant='outlined'
            label='Agent Handler'
            onChange={(e) => {
              sethandle(e.target.value);
            }}
          ></TextField>
          <Button
            onClick={async () =>
              setData(await API.registerAgent(handle, 'COSMIC'))
            }
            variant='contained'
            sx={{
              margin:'auto'
            }}
          >
            Start Shit out
          </Button>
        </div>
      </div>{' '}
    </ThemeProvider>
  );
}

export default App;
