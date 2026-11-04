import { usePurchaseShip, useShipyard } from '@api-hooks';
import { useActiveShip, useCurrentWaypoint } from '../hooks';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';

export function Shipyard() {
  const { ship } = useActiveShip();
  const currentWaypoint = useCurrentWaypoint().data;
  const purchase = usePurchaseShip();

  const hasShipyard = !!currentWaypoint?.traits?.some(
    (trait) => trait.symbol === 'SHIPYARD',
  );
  const shipyard = useShipyard(
    hasShipyard ? ship?.nav.systemSymbol : undefined,
    hasShipyard ? ship?.nav.waypointSymbol : undefined,
  ).data;

  if (!hasShipyard || !shipyard?.ships?.length) return null;

  return (
    <Panel title='Shipyard'>
      {shipyard.ships.map((forSale) => (
        <div
          key={forSale.type}
          className='flex items-center justify-between gap-4 p-2 text-sm border border-solid border-secondary-gray bg-active-secondary'
        >
          <div>
            <p className='m-0 text-gray-400'>{forSale.type}</p>
            <p className='m-0'>{forSale.name}</p>
            <p className='m-0 text-primary'>{`${forSale.purchasePrice} CR`}</p>
          </div>
          <Button
            disabled={purchase.isPending}
            onClick={() =>
              purchase.mutate({
                shipType: forSale.type,
                waypointSymbol: currentWaypoint?.symbol,
              })
            }
          >
            Purchase
          </Button>
        </div>
      ))}
    </Panel>
  );
}
