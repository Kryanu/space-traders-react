import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useDockShip,
  useExtractResources,
  useNavigateShip,
  useOrbitShip,
  useRefuelShip,
} from '@api-hooks';
import { useGame } from '../context/GameContext';
import { formatCountdown, useActiveShip, useCountdown } from '../hooks';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';

export function ShipActions() {
  const queryClient = useQueryClient();
  const { ship } = useActiveShip();
  const { activeWaypointSymbol, isMarketOpen, toggleMarket } = useGame();

  const dock = useDockShip();
  const orbit = useOrbitShip();
  const refuel = useRefuelShip();
  const extract = useExtractResources();
  const navigate = useNavigateShip();

  const status = ship?.nav?.status;
  const isDocked = status === 'DOCKED';
  const isInOrbit = status === 'IN_ORBIT';
  const isInTransit = status === 'IN_TRANSIT';

  const arrivalCooldown = useCountdown(isInTransit ? ship?.nav.route.arrival : undefined);
  const extractCooldown = useCountdown(ship?.cooldown?.expiration);

  const hasArrived = isInTransit && arrivalCooldown === 0;
  useEffect(() => {
    if (hasArrived && ship) {
      queryClient.invalidateQueries({ queryKey: ['ship', ship.symbol] });
    }
  }, [hasArrived, ship?.symbol, queryClient]);

  if (!ship) return null;

  const shipSymbol = ship.symbol;
  const canFly =
    !!activeWaypointSymbol && activeWaypointSymbol !== ship.nav.waypointSymbol;

  return (
    <Panel>
      <div className='flex items-start justify-between'>
        <div>
          <p className='m-0 text-xs text-gray-400'>Current Vessel</p>
          <h3 className='m-0 text-primary'>{shipSymbol}</h3>
        </div>
        <div className='text-right text-sm'>
          <p className='m-0 text-gray-300'>{status}</p>
          <p className='m-0 text-xs text-gray-400'>
            Fuel {ship.fuel.current}/{ship.fuel.capacity}
          </p>
        </div>
      </div>

      {isInTransit && (
        <p className='m-0 text-sm text-gray-300'>
          Arriving in {formatCountdown(arrivalCooldown)}
        </p>
      )}

      <div className='grid grid-cols-2 gap-2'>
        {isInOrbit && (
          <>
            <Button
              disabled={dock.isPending}
              onClick={() => dock.mutate({ shipSymbol })}
            >
              Dock
            </Button>
            <Button
              disabled={extract.isPending || extractCooldown > 0}
              onClick={() => extract.mutate({ shipSymbol })}
            >
              {extractCooldown > 0
                ? `Extract ${formatCountdown(extractCooldown)}`
                : 'Extract'}
            </Button>
            <Button
              disabled={navigate.isPending || !canFly}
              title={canFly ? undefined : 'Select a different waypoint first'}
              onClick={() =>
                navigate.mutate({
                  shipSymbol,
                  waypointSymbol: activeWaypointSymbol!,
                })
              }
            >
              Fly
            </Button>
          </>
        )}
        {isDocked && (
          <>
            <Button
              disabled={orbit.isPending}
              onClick={() => orbit.mutate({ shipSymbol })}
            >
              Orbit
            </Button>
            <Button
              disabled={refuel.isPending}
              onClick={() => refuel.mutate({ shipSymbol })}
            >
              Refuel
            </Button>
            <Button active={isMarketOpen} onClick={toggleMarket}>
              View Market
            </Button>
          </>
        )}
      </div>
    </Panel>
  );
}
