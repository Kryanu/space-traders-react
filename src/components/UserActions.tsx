import { useQueryClient } from '@tanstack/react-query';
import { useAgentDetails, useLogin, useRegister } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useSymbol } from '../context/SymbolContext';
import { Button } from './ui/Button';

const TEST_SYMBOLS = ['KRY001', 'KRY002'];
const FACTION = 'COSMIC';

export function UserActions() {
  const queryClient = useQueryClient();
  const { symbol, setSymbol } = useSymbol();
  const { reset } = useGame();

  const login = useLogin(symbol);
  const register = useRegister();
  const agent = useAgentDetails(symbol, login.data);

  const logout = () => {
    sessionStorage.removeItem('sessionToken');
    setSymbol('');
    reset();
    queryClient.clear();
  };

  return (
    <header className='flex items-center justify-between gap-4 px-4 py-2 bg-secondary border border-solid border-secondary-gray'>
      {login.data ? (
        <>
          <p className='m-0'>
            <span className='text-gray-400'>Agent </span>
            <span className='text-primary'>{agent.data?.symbol ?? symbol}</span>
            <span className='text-gray-400'> &middot; Balance </span>
            <span className='text-primary'>{agent.data?.credits ?? '-'}</span>
          </p>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <p className='m-0 text-gray-400'>
            {login.isError ? 'Login failed' : 'Not logged in'}
          </p>
          <div className='flex gap-2'>
            <Button
              disabled={register.isPending}
              onClick={() =>
                TEST_SYMBOLS.forEach((s) =>
                  register.mutate({ symbol: s, faction: FACTION }),
                )
              }
            >
              Register
            </Button>
            {TEST_SYMBOLS.map((s) => (
              <Button
                key={s}
                disabled={login.isFetching}
                onClick={() => setSymbol(s)}
              >
                Login {s}
              </Button>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
