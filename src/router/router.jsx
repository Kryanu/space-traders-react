import { Start } from '../components/organisms';
import {
  PlayerConsole,
  ContractDetails,
  ShipShop,
  Markets,
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
    path: '/console/market',
    element: <Markets />,
  },
  {
    path: '/kitchen-sink',
    element: <KitchenSink />,
  },
]);
