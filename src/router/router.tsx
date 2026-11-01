import { Start } from '../components/organisms';
import { PlayerConsole, PlayerConsoleV2 } from '../components/pages';
import { createMemoryRouter } from 'react-router-dom';
import { SignUp } from '../components/pages/SignUp/Signup';

export const router = createMemoryRouter([
  {
    path: '/',
    element: <PlayerConsoleV2 />,
  },
]);
