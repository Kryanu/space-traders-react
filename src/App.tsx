import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { GameContext } from './context';
import { darkTheme } from './constants/';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import type { Ship, WaypointSummary } from '@types';

const queryClient = new QueryClient();

function App() {
  const [waypoints, setWaypoints] = useState<WaypointSummary[] | undefined>(
    undefined,
  );
  const [currentShip, setCurrentShip] = useState<Ship | undefined>(undefined);
  const [selectedWaypoint, setSelectedWaypoint] = useState<WaypointSummary>({
    traits: [],
    symbol: '',
    type: '',
  });
  const [isToastVisible, setIsToastVisible] = useState({
    message: '',
    isVisible: false,
  });

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
          <RouterProvider router={router} />
        </GameContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
