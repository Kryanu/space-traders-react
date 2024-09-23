import { Start } from '../components/organisms';
import { PlayerConsole } from '../components/pages';
import { createBrowserRouter } from 'react-router-dom';
import { SignUp } from '../components/pages/SignUp/Signup';

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
    path: '/sign-up',
    element: <SignUp />
  }
]);
