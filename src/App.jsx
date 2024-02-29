import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { Start } from './components/organisms';
import {
  PlayerConsole,
  ContractDetails,
  ShipShop,
  AstroidMining,
} from './components/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useToken } from './hooks';
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
    element: <AstroidMining />,
  },
  {
    path: '/console/market',
    element: <div>Market</div>,
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
