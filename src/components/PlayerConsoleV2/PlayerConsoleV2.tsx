import { useState } from 'react';
import { useAgentDetails, useLogin, useRegister } from '@api-hooks';

export default function PlayerConsoleV2() {
  const [symbol, setSymbol] = useState('');
  const faction = 'COSMIC';

  const login = useLogin(symbol);
  const register = useRegister();

  const agent = useAgentDetails(symbol, login.data);

  return (
    <div>
      <button
        disabled={register.isPending}
        onClick={() => register.mutate({ symbol: 'KRY001', faction })}
      >
        Register
      </button>
      <button onClick={() => setSymbol('KRY001')}>KRY001</button>
      <button onClick={() => setSymbol('KRY002')}>KRY002</button>

      {agent.data?.accountId}
      {login.isError && <p>Login failed</p>}
    </div>
  );
}
