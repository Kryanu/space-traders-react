import { UserActions } from './UserActions';
import { ShipList } from './ShipList';
import { SymbolProvider } from '../context/SymbolContext';
import { ShipActions } from './ShipActions';

export default function PlayerConsoleV2() {
  return (
    <SymbolProvider>
      <div
        style={{
          gridTemplateRows: '5% 1fr',
        }}
        className='grid h-full w-full bg-black'
      >
        <UserActions />
        <div style={{ gridTemplateColumns: '20% 35% 45%' }} className='grid'>
          <div className='flex flex-col p-4 space-y-4'>
            <ShipList />
            <ShipActions />
          </div>
          <div>waypoint navigation</div>
          <div>
            <div>waypoint details</div>
            <div>Market Details</div>
            <div>Shipyard</div>
          </div>
        </div>
      </div>
    </SymbolProvider>
  );
}
