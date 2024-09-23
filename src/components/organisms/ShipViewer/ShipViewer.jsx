import { useContext } from 'react';
import { GameContext } from '../../../context';
import { isValidArray } from '../../../hooks';
import { Button, Typography } from '@mui/material';
import { Nav, Cargo } from '../../molecules/';

function Ships({ ships, setShip, closeModal }) {
  if (!isValidArray(ships)) return <></>;
  return ships.map((ship, index) => {
    return (
      <div
        key={index}
        className='flex flex-col p-4 text-left space-y-2 bg-blackie border-2 border-map-green text-map-green rounded-md m-2'
      >
        <Typography variant='h6'> {`Name: ${ship.symbol}`}</Typography>
        <Nav nav={ship.nav} fuel={ship.fuel} />
        <Cargo cargo={ship.cargo} />
        <div className='flex flex-col-reverse h-full mt-auto'>
          <Button
            onClick={() => {
              setShip(ship);
              closeModal();
            }}
          >
            Select Ship
          </Button>
        </div>
      </div>
    );
  });
}

export default function ShipViewer(props) {
  const { closeModal, ships } = props;
  const { setCurrentShip } = useContext(GameContext);
  return (
    <div className='flex'>
      <Ships ships={ships} setShip={setCurrentShip} closeModal={closeModal} />
    </div>
  );
}
