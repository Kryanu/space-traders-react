import { useSellCargo } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useActiveShip } from '../hooks';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';

export function CargoList() {
  const { ship } = useActiveShip();
  const { isCargoOpen } = useGame();
  const sell = useSellCargo();

  if (!ship?.cargo || !isCargoOpen || ship.cargo.units === 0) return null;

  const isDocked = ship.nav.status === 'DOCKED';

  return (
    <Panel title={`Cargo: ${ship.cargo.units}/${ship.cargo.capacity}`}>
      {ship.cargo.inventory.map((item) => (
        <div
          key={item.symbol}
          className='flex items-center justify-between gap-4 p-2 text-sm border border-solid border-secondary-gray bg-active-secondary'
        >
          <span>{item.name}</span>
          <span className='ml-auto text-gray-400'>{item.units}</span>
          {isDocked && (
            <Button
              className='py-1'
              disabled={sell.isPending}
              onClick={() =>
                sell.mutate({
                  shipSymbol: ship.symbol,
                  cargoSymbol: item.symbol,
                  units: item.units,
                })
              }
            >
              Sell
            </Button>
          )}
        </div>
      ))}
    </Panel>
  );
}
