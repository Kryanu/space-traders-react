import PlayerConsoleV2 from '../components/PlayerConsoleV2/PlayerConsoleV2';
import { createMemoryRouter } from 'react-router-dom';

export const router = createMemoryRouter([
  {
    path: '/',
    element: <PlayerConsoleV2 />,
  },
]);
