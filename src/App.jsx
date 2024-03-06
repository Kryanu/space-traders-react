import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { router } from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { retrieveToken } from './hooks/index.js';
import { TokenContext } from './context/TokenContext.jsx';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  //Checks for token in sessionStorage
  const tokenKey = 'token';
  const handleKey = 'handle';
  const [token, setToken] = useState(undefined);
  const handle = window.sessionStorage.getItem(handleKey);

  useEffect(() => {
    if (!token) {
      try {
        const localToken = window.sessionStorage.getItem(tokenKey);
        if (localToken && localToken !== 'undefined') {
          setToken(localToken);
        } else {
          retrieveToken(handle, setToken);
          window.sessionStorage.setItem(tokenKey, token);
        }
      } catch (ex) {
        console.error('No token was found');
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TokenContext.Provider value={{ token, setToken }}>
        <RouterProvider router={router} />
      </TokenContext.Provider>
    </ThemeProvider>
  );
}

export default App;
