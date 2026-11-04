import { useWaypoint } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useActiveShip } from '../hooks';
import { Panel } from './ui/Panel';

export function WaypointInfo() {
  const { ship } = useActiveShip();
  const { activeWaypointSymbol } = useGame();

  const waypoint = useWaypoint(
    ship?.nav && activeWaypointSymbol
      ? {
          systemSymbol: ship.nav.systemSymbol,
          waypointSymbol: activeWaypointSymbol,
        }
      : undefined,
  ).data;

  if (!activeWaypointSymbol || !waypoint) return null;

  return (
    <Panel title={waypoint.symbol}>
      <div className='grid grid-cols-2 gap-2 text-sm'>
        <div>
          <p className='m-0 text-gray-400'>X Coordinate</p>
          <p className='m-0'>{waypoint.x}</p>
        </div>
        <div>
          <p className='m-0 text-gray-400'>Y Coordinate</p>
          <p className='m-0'>{waypoint.y}</p>
        </div>
      </div>
      {waypoint.traits?.length > 0 && (
        <div>
          <p className='m-0 mb-2 text-sm text-gray-400'>Planetary Traits</p>
          <div className='flex flex-wrap gap-2'>
            {waypoint.traits.map((trait) => (
              <span
                key={trait.symbol}
                className='px-2 py-1 text-xs border border-solid border-secondary-gray bg-active-secondary'
              >
                {trait.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}
