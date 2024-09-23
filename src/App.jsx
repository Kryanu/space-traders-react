import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { router } from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { GameContext } from './context';
import { Toast } from './components/molecules/Toast/Toast.jsx';
import { darkTheme } from './constants/';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [waypoints, setWaypoints] = useState(undefined);
  const [currentShip, setCurrentShip] = useState(undefined);
  const [selectedWaypoint, setSelectedWaypoint] = useState({ traits: [] });
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
