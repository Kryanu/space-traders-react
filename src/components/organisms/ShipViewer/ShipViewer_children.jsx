import { useState } from 'react';
import { isValidArray } from '../../../hooks';
import {
  Button,
  Collapse,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

function Nav(props) {
  const { nav, fuel } = props;
  if (!nav) return <></>;

  return (
    <>
      <Typography variant='h6'>{`Waypoint: ${nav.waypointSymbol}`}</Typography>
      <Typography variant='h6'>{`Status: ${nav.status}`}</Typography>
      <Typography variant='h6'>{`Fuel: ${fuel.current} /${fuel.capacity}`}</Typography>
    </>
  );
}

function Cargo(props) {
  const { cargo } = props;
  const [isOpen, setIsOpen] = useState(false);

  if (!cargo || !isValidArray(cargo?.inventory))
    return (
      <>
        <Typography variant='h6' >Cargo: Empty</Typography>
      </>
    );
  const inventory = cargo?.inventory.map((item, index) => {
    return (
      <Typography
        key={index}
      >{`${item.name}: ${item.units}/${cargo.capacity}`}</Typography>
    );
  });

  return (
    <>
      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary='Show Cargo' />
      </ListItemButton>
      <Collapse in={isOpen}>
        <Typography>{`Cargo ${cargo.units}/${cargo.capacity}`}</Typography>
        {inventory}
      </Collapse>
    </>
  );
}

export function Ship(props) {
  const { ship } = props;

  if (!ship) return <></>;
  return (
    <div className='flex flex-col p-4 text-left bg-blackie border-2 border-map-green text-map-green rounded-md grow'>
      <Typography variant='h6'> {`Name: ${ship.symbol}`}</Typography>
      <Nav nav={ship.nav} fuel={ship.fuel} />
      <Cargo cargo={ship.cargo} />
    </div>
  );
}

export function Ships(props) {
  const { ships, setShip, closeModal } = props;
  if (!isValidArray(ships)) return <></>;
  const data = ships.map((ship, index) => {
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

  return <div className='flex'>{data}</div>;
}
