import { ListItem, List, ListItemText, Button } from '@mui/material';
import { isValidArray } from '../../../hooks';
import {
  navigateShip,
  dockShip,
  refuelShip,
  orbitShip,
  mineAsteroid,
  sellCargo,
} from './astroidMining_logic';
export function DisplayAsteroids(asteroids, token, shipSymbol, cargo, setTime) {
  if (!asteroids) {
    return <></>;
  }

  return (
    <List>{AsteroidList(asteroids, token, shipSymbol, cargo, setTime)}</List>
  );
}

const AsteroidList = (asteroids, token, shipSymbol, cargo, setTime) => {
  if (!asteroids && !isValidArray(asteroids)) {
    return <></>;
  }

  return asteroids.map((asteroid, index) => {
    return (
      <ListItem
        sx={{ alignItems: 'start' }}
        className='flex flex-col border-2 rounded-md border-slate-300 mb-2'
        key={index}
      >
        <ListItemText>{`Symbol ${asteroid.symbol}`}</ListItemText>
        <ListItemText>{`Type ${asteroid.type}`}</ListItemText>
        {DisplayTraits(asteroid)}
        {Actions(token, shipSymbol, asteroid, cargo, setTime)}
      </ListItem>
    );
  });
};

const DisplayTraits = (asteroid) => {
  if (!asteroid.traits) {
    return <></>;
  }

  return asteroid.traits.map((trait, index) => {
    return <ListItemText key={index}>{`Trait: ${trait.name}`}</ListItemText>;
  });
};

const Actions = (token, shipSymbol, asteroid, cargo, setTime) => {
  return (
    <div className='flex space-x-2'>
      <Button
        onClick={async () => {
          setTime(await navigateShip(token, shipSymbol, asteroid.symbol));
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
          refuelShip(token, shipSymbol);
        }}
      >
        Refuel
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
          mineAsteroid(token, shipSymbol);
        }}
      >
        Mine
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
