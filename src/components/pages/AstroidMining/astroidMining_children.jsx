import { ListItem, List, ListItemText } from '@mui/material';
import { isValidArray } from '../../../hooks';
import {
  navigateShip,
  dockShip,
  refuelShip,
  orbitShip,
  mineAsteroid,
} from './astroidMining_logic';
import { ActionRow } from '../../molecules/index';

function DisplayTraits(props) {
  const { asteroid } = props;
  if (!asteroid.traits) {
    return <></>;
  }

  return asteroid.traits.map((trait, index) => {
    return <ListItemText key={index}>{`Trait: ${trait.name}`}</ListItemText>;
  });
}

export function DisplayAsteroids(asteroids, token, shipSymbol, setTime) {
  if ((!asteroids && !isValidArray(asteroids)) || !token) {
    return <></>;
  }

  const AsteroidList = asteroids.map((asteroid, index) => {
    const actionRowConfig = [
      {
        text: 'Fly To',
        callBack: navigateShip,
        callBackProps: {
          token,
          shipSymbol,
          waypointSymbol: asteroid.symbol,
          setTime,
        },
      },
      {
        text: 'Dock',
        callBack: dockShip,
        callBackProps: { token, shipSymbol },
      },
      {
        text: 'refuelShip',
        callBack: refuelShip,
        callBackProps: { token, shipSymbol },
      },
      {
        text: 'Orbit',
        callBack: orbitShip,
        callBackProps: { token, shipSymbol },
      },
      {
        text: 'Mine Asteroid',
        callBack: mineAsteroid,
        callBackProps: { token, shipSymbol },
      },
    ];
    return (
      <ListItem
        sx={{ alignItems: 'start' }}
        className='flex flex-col border-2 rounded-md border-slate-300 mb-2'
        key={index}
      >
        <ListItemText>{`Symbol ${asteroid.symbol}`}</ListItemText>
        <ListItemText>{`Type ${asteroid.type}`}</ListItemText>
        <DisplayTraits asteroid={asteroid} />
        <ActionRow actions={actionRowConfig} />
      </ListItem>
    );
  });
  return <List>{AsteroidList}</List>;
}
