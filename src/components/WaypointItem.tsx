import type { Waypoint } from '@types';

interface WaypointItemProps {
  waypoint: Waypoint;
  currentWaypoint?: Waypoint;
  isActive: boolean;
  isShipHere: boolean;
  onSelect: () => void;
}

function distance(from?: Waypoint, to?: Waypoint) {
  if (!from || !to) return 0;
  return Math.round(Math.hypot(from.x - to.x, from.y - to.y));
}

export function WaypointItem({
  waypoint,
  currentWaypoint,
  isActive,
  isShipHere,
  onSelect,
}: WaypointItemProps) {
  const away = distance(currentWaypoint, waypoint);

  return (
    <button
      type='button'
      onClick={onSelect}
      className={`grid grid-cols-[1fr_auto] gap-x-2 p-2 text-left cursor-pointer border border-solid bg-active-secondary ${
        isActive
          ? 'border-primary'
          : 'border-secondary-gray hover:border-primary/60'
      }`}
    >
      <span className={isActive ? 'text-primary' : 'text-gray-200'}>
        {waypoint.symbol}
      </span>
      <span className='text-xs text-gray-400'>{waypoint.faction?.symbol}</span>
      <span className='text-xs text-gray-400'>{waypoint.type}</span>
      {isShipHere ? (
        <span className='text-xs text-primary'>You are here</span>
      ) : (
        away > 0 && <span className='text-xs text-gray-400'>{away}</span>
      )}
    </button>
  );
}
