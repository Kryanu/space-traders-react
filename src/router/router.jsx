import { Start } from '../components/organisms';
import {
  PlayerConsole,
  ContractDetails,
  ShipShop,
  KitchenSink,
} from '../components/pages';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
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
    path: '/kitchen-sink',
    element: <KitchenSink />,
  },
]);
