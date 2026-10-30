import { useContext } from 'react';
import { GameContext } from '../../../context';
import { isValidArray } from '../../../hooks';
import { Nav, Cargo } from '../../molecules';
import { Ship } from '@types';

function Ships({
  ships,
  setShip,
  closeModal,
}: {
  ships: Ship[];
  setShip: Function;
  closeModal: Function;
}) {
  if (!isValidArray(ships)) return <></>;
  return ships.map((ship, index) => {
    return (
      <div
        key={index}
        className='flex flex-col p-4 text-left space-y-2 bg-blackie border-2 border-map-green text-map-green rounded-md m-2'
      >
        <p> {`Name: ${ship.symbol}`}</p>
        <Nav nav={ship.nav} fuel={ship.fuel} />
        <Cargo cargo={ship.cargo} />
        <div className='flex flex-col-reverse h-full mt-auto'>
          <button
            onClick={() => {
              setShip(ship);
              closeModal();
            }}
          >
            Select Ship
          </button>
        </div>
      </div>
    );
  });
}

export default function ShipViewer(props: {
  closeModal: Function;
  ships: Ship[];
}) {
  const { closeModal, ships } = props;
  const { setCurrentShip } = useContext(GameContext) as unknown as {
    setCurrentShip: Function;
  };
  return (
    <div className='flex'>
      <Ships ships={ships} setShip={setCurrentShip} closeModal={closeModal} />
    </div>
  );
}
