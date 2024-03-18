import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../../context';
import { API } from '../../../api/service';
import { isValidArray } from '../../../hooks';
import { Button, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';

export default function ShipViewer(props) {
  const { closeModal } = props;
  const [ships, setShips] = useState(undefined);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const { setCurrentShip } = useContext(GameContext);
  useEffect(() => {
    retrieveShips(token, setShips);
  }, []);

  return <>{Ships(ships, setCurrentShip, closeModal)}</>;
}

const retrieveShips = async (token, setShips) => {
  setShips(await API.fleet.getShips(token));
};

const Ships = (ships, setShip, closeModal) => {
  if (!isValidArray(ships)) return <></>;

  const data = ships.map((ship, index) => {
    return (
      <div
        key={index}
        className='p-4 text-left space-y-2 bg-blackie border-2 border-map-green text-map-green rounded-md m-2'
      >
        <Typography> {`Name: ${ship.symbol}`}</Typography>
        <Nav nav={ship.nav} />
        <Fuel fuel={ship.fuel} />
        <Button
          onClick={() => {
            setShip(ship);
            closeModal();
          }}
        >
          Select Ship
        </Button>
      </div>
    );
  });

  return <div className='flex'>{data}</div>;
};

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
