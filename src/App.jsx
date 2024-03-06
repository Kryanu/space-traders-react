import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { Start } from './components/organisms';
import {
  PlayerConsole,
  ContractDetails,
  ShipShop,
  AsteroidMining,
  Markets,
} from './components/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useToken } from './hooks';
import CountDown from './components/atoms/Countdown';
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
    element: <ContractDetails />,
  },
  {
    path: '/console/ship-shop',
    element: <ShipShop />,
  },
  {
    path: '/console/astroid-mining',
    element: <AsteroidMining />,
  },
  {
    path: '/console/market',
    element: <Markets />,
  },
  {
    path: '/kitchen-sink',
    element: (
      <CountDown
        arrival={'2024-03-04T20:44:44.796Z'}
        departure={'2024-03-04T18:41:34.796Z'}
      />
    ),
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  //Checks for token in sessionStorage
  useToken();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
