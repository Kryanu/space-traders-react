import { Start } from '../components/organisms';
import { PlayerConsole } from '../components/pages';
import { createMemoryRouter } from 'react-router-dom';
import { SignUp } from '../components/pages/SignUp/Signup';

export const router = createMemoryRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: '/console',
    element: <PlayerConsole />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);
