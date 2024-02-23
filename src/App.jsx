import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { Start } from './components/organisms';
import { PlayerConsole, ContractDetails } from './components/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/console',
    element: <PlayerConsole />,
  },
  {
    path: '/console/:contractId',
    element: <ContractDetails />
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
