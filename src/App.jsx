import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { router } from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { retrieveToken } from './hooks/index.js';
import { GameContext, TokenContext } from './context';
import { Toast } from './components/molecules/Toast/Toast.jsx';
import { API } from './api/service.js';
import { darkTheme } from './constants/';
import { retrieveMapWaypoints } from './hooks/helpers.js';
const retrieveSystems = async (setSystems) => {
  setSystems(await API.system.listSystems());
};

const setLocationDetails = (agent) => {
  if (agent && agent?.headquarters.length > 0) {
    const locations = agent.headquarters.split('-');

    return {
      sector: locations[0],
      system: `${locations[0]}-${locations[1]}`,
      waypoint: agent.headquarters,
    };
  }
};

function App() {
  const tokenKey = 'token';
  const handleKey = 'handle';
  const [token, setToken] = useState(undefined);
  const [handle, setHandle] = useState(window.localStorage.getItem(handleKey));
  const [waypoints, setWaypoints] = useState(undefined);
  const [agent, setAgent] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [currentShip, setCurrentShip] = useState(undefined);
  const [selectedWaypoint, setSelectedWaypoint] = useState({ traits: [] });
  const [isToastVisible, setIsToastVisible] = useState({
    message: '',
    isVisible: false,
  });
  const [systems, setSystems] = useState(undefined);
  useEffect(() => {
    const localToken = window.localStorage.getItem(tokenKey);
    if (!token) {
      try {
        if (localToken && localToken !== 'undefined') {
          setToken(localToken);
        } else {
          retrieveToken(handle, setToken);
          if (token) {
            window.localStorage.setItem(tokenKey, token);
          }
        }
      } catch (ex) {
        console.error('No token was found');
      }
    } else {
      if (!localToken || localToken === 'undefined') {
        window.localStorage.setItem(tokenKey, token);
      }
    }
  }, [handle]);

  useEffect(() => {
    if (!location && agent) {
      setLocation(setLocationDetails(agent));
    }
  }, [agent]);

  useEffect(() => {
    if (location) {
      retrieveSystems(setSystems);
      retrieveMapWaypoints(token, location.system, undefined, setWaypoints);
    }
  }, [location]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TokenContext.Provider value={{ token, setToken, handle, setHandle }}>
        <GameContext.Provider
          value={{
            agent,
            setAgent,
            location,
            setLocation,
            isToastVisible,
            setIsToastVisible,
            systems,
            setSystems,
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
      </TokenContext.Provider>
    </ThemeProvider>
  );
}

export default App;
