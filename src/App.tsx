import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { GameContext } from './context';
import { Toast } from './components/molecules/Toast/Toast';
import { darkTheme } from './constants/';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FormControlLabel, Switch } from '@mui/material';
import { DATA_MODE, getDataMode, saveDataMode } from './api/mode';
import type { ChangeEvent } from 'react';
import type { Ship, Waypoint } from '@types';

const queryClient = new QueryClient();

function App() {
  const [waypoints, setWaypoints] = useState<Waypoint[] | undefined>(undefined);
  const [currentShip, setCurrentShip] = useState<Ship | undefined>(undefined);
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint>({
    traits: [],
    symbol: '',
    type: '',
  });
  const [isToastVisible, setIsToastVisible] = useState({
    message: '',
    isVisible: false,
  });
  const [dataMode, setDataMode] = useState(getDataMode);

  const handleDataModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMode = event.target.checked ? DATA_MODE.mock : DATA_MODE.live;
    saveDataMode(nextMode);
    setDataMode(nextMode);
    queryClient.clear();
    router.navigate('/');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <GameContext.Provider
          value={{
            isToastVisible,
            setIsToastVisible,
            waypoints,
            setWaypoints,
            currentShip,
            setCurrentShip,
            selectedWaypoint,
            setSelectedWaypoint,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={dataMode === DATA_MODE.mock}
                onChange={handleDataModeChange}
                color='success'
                inputProps={{ 'aria-label': 'Use mock data' }}
              />
            }
            label={dataMode === DATA_MODE.mock ? 'Mock data' : 'Live data'}
            sx={{ position: 'fixed', top: 8, right: 16, zIndex: 1300, color: '#32C832' }}
          />
          <RouterProvider router={router} />
          <Toast
            isVisible={isToastVisible.isVisible}
            message={isToastVisible.message}
          />
        </GameContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
