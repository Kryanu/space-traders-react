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
  const { nav } = props;
  if (!nav) return <></>;

  return (
    <>
      <Typography>{`Waypoint: ${nav.waypointSymbol}`}</Typography>
      <Typography>{`Status: ${nav.status}`}</Typography>
    </>
  );
}

function Fuel(props) {
  const { fuel } = props;
  if (!fuel) return <></>;

  return (
    <div>
      <Typography>{`Fuel: ${fuel.current} /${fuel.capacity}`}</Typography>
    </div>
  );
}

function Cargo(props) {
  const { cargo } = props;
  const [isOpen, setIsOpen] = useState(false);
  if (!cargo || !isValidArray(cargo?.inventory))
    return (
      <>
        <Typography sx={{padding: '0.75rem'}}>Cargo Empty</Typography>
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

export function Ships(props) {
  const { ships, setShip, closeModal } = props;
  if (!isValidArray(ships)) return <></>;
  const data = ships.map((ship, index) => {
    return (
      <div
        key={index}
        className='flex flex-col p-4 text-left space-y-2 bg-blackie border-2 border-map-green text-map-green rounded-md m-2'
      >
        <Typography> {`Name: ${ship.symbol}`}</Typography>
        <Nav nav={ship.nav} />
        <Fuel fuel={ship.fuel} />
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
