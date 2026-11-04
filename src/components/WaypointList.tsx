import { useState } from 'react';
import { useSystemWaypoints } from '@api-hooks';
import { useGame } from '../context/GameContext';
import { useActiveShip, useCurrentWaypoint } from '../hooks';
import { WaypointItem } from './WaypointItem';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';

const PAGE_SIZE = 20;

const TRAIT_FILTERS = [
  { value: '', text: 'No Filter' },
  { value: 'SHIPYARD', text: 'Shipyard' },
  { value: 'MARKETPLACE', text: 'Marketplace' },
  { value: 'COMMON_METAL_DEPOSITS', text: 'Common Metals' },
];

export function WaypointList() {
  const { ship } = useActiveShip();
  const { activeWaypointSymbol, toggleWaypoint } = useGame();
  const currentWaypoint = useCurrentWaypoint().data;

  const [trait, setTrait] = useState('');
  const [page, setPage] = useState(1);

  const systemSymbol = ship?.nav?.systemSymbol;
  const waypoints = useSystemWaypoints(
    systemSymbol
      ? {
          systemSymbol,
          payload: { traits: trait || undefined, page, limit: PAGE_SIZE },
        }
      : undefined,
  );

  const items = waypoints.data?.data ?? [];
  const pinCurrent =
    page === 1 &&
    !!currentWaypoint?.symbol &&
    !items.some((w) => w.symbol === currentWaypoint.symbol);
  const visible = pinCurrent ? [currentWaypoint!, ...items] : items;

  const total = waypoints.data?.meta?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Panel
      title='Waypoint Navigation'
      className='overflow-y-auto'
      action={
        <select
          value={trait}
          onChange={(e) => {
            setTrait(e.target.value);
            setPage(1);
          }}
          className='px-2 py-1 text-sm bg-active-secondary text-primary border border-solid border-secondary-gray'
        >
          {TRAIT_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.text}
            </option>
          ))}
        </select>
      }
    >
      {visible.map((waypoint) => (
        <WaypointItem
          key={waypoint.symbol}
          waypoint={waypoint}
          currentWaypoint={currentWaypoint}
          isActive={waypoint.symbol === activeWaypointSymbol}
          isShipHere={waypoint.symbol === ship?.nav.waypointSymbol}
          onSelect={() => toggleWaypoint(waypoint.symbol)}
        />
      ))}

      {pageCount > 1 && (
        <div className='flex items-center justify-between pt-2'>
          <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <span className='text-sm text-gray-400'>
            {page} / {pageCount}
          </span>
          <Button
            disabled={page >= pageCount}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </Panel>
  );
}
