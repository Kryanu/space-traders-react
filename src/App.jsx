import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { router } from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { retrieveToken } from './hooks/index.js';
import { GameContext, TokenContext } from './context';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const tokenKey = 'token';
  const handleKey = 'handle';
  const [token, setToken] = useState(undefined);
  const [handle, setHandle] = useState(
    window.sessionStorage.getItem(handleKey)
  );
  const [agent, setAgent] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [ships, setShips] = useState(undefined);
  //Sets token when handle changes and on page load
  useEffect(() => {
    const localToken = window.sessionStorage.getItem(tokenKey);
    if (!token) {
      try {
        if (localToken && localToken !== 'undefined') {
          setToken(localToken);
        } else {
          retrieveToken(handle, setToken);
          if (token) {
            window.sessionStorage.setItem(tokenKey, token);
          }
        }
      } catch (ex) {
        console.error('No token was found');
      }
    } else {
      if (!localToken || localToken === 'undefined') {
        window.sessionStorage.setItem(tokenKey, token);
      }
    }
  }, [handle]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TokenContext.Provider value={{ token, setToken, handle, setHandle }}>
        <GameContext.Provider
          value={{ agent, setAgent, location, setLocation, ships, setShips }}
        >
          <RouterProvider router={router} />
        </GameContext.Provider>
      </TokenContext.Provider>
    </ThemeProvider>
  );
}

export default App;
