import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAgentDetails } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';

export function UserActions() {
  const queryClient = useQueryClient();
  const { token, symbol = '', isAuth } = useAuth();
  const { reset } = useGame();
  const agent = useAgentDetails(symbol, token);

  // Logout can also happen in the shell, so clear state whenever the token goes away.
  useEffect(() => {
    if (!token) {
      reset();
      queryClient.clear();
    }
  }, [token, reset, queryClient]);

  return (
    <header className='flex items-center justify-between gap-4 px-4 py-2 bg-secondary border border-solid border-secondary-gray'>
      <p className='m-0'>
        {isAuth ? (
          <>
            <span className='text-gray-400'>Agent </span>
            <span className='text-primary'>{agent.data?.symbol ?? symbol}</span>
            <span className='text-gray-400'> &middot; Balance </span>
            <span className='text-primary'>{agent.data?.credits ?? '-'}</span>
          </>
        ) : (
          <span className='text-gray-400'>Not logged in</span>
        )}
      </p>
    </header>
  );
}
