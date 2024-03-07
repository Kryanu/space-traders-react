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

export function DisplayAsteroids(
  asteroids,
  token,
  shipSymbol,
  setTime,
  setIsToastVisible
) {
  if ((!asteroids && !isValidArray(asteroids)) || !token) {
    return <></>;
  }
  const actionProps = { token, shipSymbol, setIsToastVisible };
  const AsteroidList = asteroids.map((asteroid, index) => {
    const actionRowConfig = [
      {
        text: 'Fly To',
        callBack: navigateShip,
        callBackProps: {
          waypointSymbol: asteroid.symbol,
          setTime,
          ...actionProps,
        },
      },
      {
        text: 'Dock',
        callBack: dockShip,
        callBackProps: actionProps,
      },
      {
        text: 'refuelShip',
        callBack: refuelShip,
        callBackProps: actionProps,
      },
      {
        text: 'Orbit',
        callBack: orbitShip,
        callBackProps: actionProps,
      },
      {
        text: 'Mine Asteroid',
        callBack: mineAsteroid,
        callBackProps: actionProps,
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
