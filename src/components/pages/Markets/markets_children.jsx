import { Button } from '@mui/material';
import { navigateShip, orbitShip, dockShip, sellCargo } from './markets_logic';
export const Actions = (token, shipSymbol, market, cargo) => {
  return (
    <div className='flex space-x-2'>
      <Button
        onClick={() => {
          navigateShip(token, shipSymbol, market.symbol);
        }}
      >
        Fly To
      </Button>
      <Button
        onClick={() => {
          dockShip(token, shipSymbol);
        }}
      >
        Dock
      </Button>
      <Button
        onClick={() => {
          orbitShip(token, shipSymbol);
        }}
      >
        Orbit
      </Button>
      <Button
        onClick={() => {
          sellCargo(token, shipSymbol, cargo);
        }}
      >
        Sell Cargo
      </Button>
    </div>
  );
};
