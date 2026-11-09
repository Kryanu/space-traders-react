import { GameProvider } from '../context/GameContext';
import { useActiveShip } from '../hooks';
import { UserActions } from './UserActions';
import { ShipList } from './ShipList';
import { ShipActions } from './ShipActions';
import { WaypointList } from './WaypointList';
import { WaypointInfo } from './WaypointInfo';
import { CargoList } from './CargoList';
import { Shipyard } from './Shipyard';
import { Market } from './Market';

function Console() {
  const { isAuth } = useActiveShip();

  return (
    <div className='grid h-full w-full gap-3 p-3 bg-black grid-rows-[auto_minmax(0,1fr)]'>
      <UserActions />
      {isAuth && (
        <div className='grid min-h-0 gap-3 grid-cols-[20%_30%_1fr]'>
          <div className='flex flex-col gap-3 min-h-0'>
            <ShipList />
            <ShipActions />
          </div>
          <WaypointList />
          <div className='flex flex-col gap-3 min-h-0 overflow-y-auto'>
            <WaypointInfo />
            <CargoList />
            <Shipyard />
            <Market />
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlayerConsoleV2() {
  return (
    <GameProvider>
      <Console />
    </GameProvider>
  );
}
