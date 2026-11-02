import { useAgentDetails, useLogin, useRegister } from '@api-hooks';
import { useSymbol } from '../context/SymbolContext';

export function UserActions() {
  const { symbol, setSymbol } = useSymbol();
  const faction = 'COSMIC';

  const login = useLogin(symbol);
  const register = useRegister();

  const agent = useAgentDetails(symbol, login.data);
  return (
    <div className='flex items-center pt-4'>
      <button
        disabled={register.isPending}
        onClick={() => {
          register.mutate({ symbol: 'KRY001', faction });
          register.mutate({ symbol: 'KRY002', faction });
        }}
      >
        Register
      </button>
      <button onClick={() => setSymbol('KRY001')}>KRY001</button>
      <button onClick={() => setSymbol('KRY002')}>KRY002</button>

      <p>Balance: {agent.data?.credits}</p>
      {login.isError && <p>Login failed</p>}
    </div>
  );
}
