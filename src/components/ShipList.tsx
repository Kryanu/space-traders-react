import { useGame } from '../context/GameContext';
import { useActiveShip } from '../hooks';
import { CargoIcon } from './ui/icons';
import { Panel } from './ui/Panel';

export function ShipList() {
  const { fleet, ship: activeShip } = useActiveShip();
  const { selectShip, isCargoOpen, toggleCargo } = useGame();

  const cargoToggle = !!activeShip?.cargo?.units && (
    <button
      type='button'
      onClick={toggleCargo}
      className='flex items-center gap-2 text-sm text-gray-300 cursor-pointer bg-transparent border-0'
    >
      <CargoIcon />
      INV
      <span
        className={`size-2 rounded-full ${isCargoOpen ? 'bg-primary' : 'bg-secondary-gray'}`}
      />
    </button>
  );

  return (
    <Panel title='Active Ships' action={cargoToggle} className='flex-1 overflow-y-auto'>
      {fleet.map((ship) => {
        const isActive = ship.symbol === activeShip?.symbol;
        return (
          <button
            key={ship.symbol}
            type='button'
            onClick={() => selectShip(ship.symbol)}
            className={`flex items-center justify-between p-2 text-left cursor-pointer border border-solid bg-active-secondary ${
              isActive
                ? 'border-primary text-primary'
                : 'border-secondary-gray text-gray-300 hover:border-primary/60'
            }`}
          >
            <span>{ship.symbol}</span>
            <span className='text-xs text-gray-400'>
              {ship.registration.role}
            </span>
          </button>
        );
      })}
    </Panel>
  );
}
