import { useLogin, useShips } from '@api-hooks';
import { useSymbol } from '../context/SymbolContext';

export function ShipList() {
  const { symbol } = useSymbol();
  const token = useLogin(symbol);
  const ships = useShips(token?.data ?? '');

  return (
    <div className='flex flex-col space-y-2 p-4 bg-secondary'>
      <div className='flex items-center w-full'>
        <p className='flex-1 text-primary'>Active Ships</p>
        <p className='text-primary'>Inventory</p>
      </div>
      <div>
        {ships.data?.data.map((ship, index) => (
          <div
            key={ship.symbol}
            className={`flex items-center justify-between bg-active-secondary p-2 m-4 border border-solid ${
              index % 2 === 0 ? 'border-primary' : 'border-secondary-gray'
            }`}
          >
            <p>{ship.symbol}</p>
            <p>{`Active`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
