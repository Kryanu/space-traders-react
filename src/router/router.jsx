import { Start } from '../components/organisms';
import {
  PlayerConsole,
  ContractDetails,
  ShipShop,
  AsteroidMining,
  Markets,
  KitchenSink
} from '../components/pages';
import CountDown from '../components/atoms/Countdown';
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
      // <CountDown
      //   arrival={'2024-03-08T23:44:44.796Z'}
      //   departure={'2024-03-04T18:41:34.796Z'}
      // />
      <KitchenSink />
    ),
  },
]);
