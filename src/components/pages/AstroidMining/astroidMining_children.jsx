import {
  ListItem,
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  Divider,
} from '@mui/material';
import { isValidArray } from '../../../hooks';
import {
  timedNavigateShip,
  dockShip,
  refuelShip,
  orbitShip,
  mineAsteroid,
} from './astroidMining_logic';
import { ActionRow } from '../../molecules/index';
import { useState, useContext } from 'react';
import { TokenContext, GameContext } from '../../../context';
function DisplayTraits(props) {
  const { asteroid } = props;
  if (!asteroid.traits) {
    return <></>;
  }

  return asteroid.traits.map((trait, index) => {
    return <ListItemText key={index}>{`- ${trait.name}`}</ListItemText>;
  });
}

export function DisplayAsteroids(props) {
  const { asteroids, setTime } = props;
  const { token } = useContext(TokenContext);
  const { ships, setIsToastVisible } = useContext(GameContext);
  const [isTraitsOpen, setIsTraitsOpen] = useState(false);
  if ((!asteroids && !isValidArray(asteroids)) || !token) {
    return <></>;
  }
  let asterdoidsData = asteroids.data;
  let shipSymbol = ships?.symbol;
  const actionProps = { token, shipSymbol, setIsToastVisible };
  const AsteroidList = asterdoidsData.map((asteroid, index) => {
    const actionRowConfig = [
      {
        text: 'Fly To',
        callBack: timedNavigateShip,
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
        sx={{ alignItems: 'start', color: '#32C832' }}
        className='flex flex-col border-2 rounded-md border-map-green mb-2'
        key={index}
      >
        <ListItemText>{`Symbol ${asteroid.symbol}`}</ListItemText>
        <ListItemText>{`Type ${asteroid.type}`}</ListItemText>
        <ListItemButton onClick={() => setIsTraitsOpen(!isTraitsOpen)}>
          <ListItemText primary='Traits' style={{ color: '#32C832' }} />
        </ListItemButton>
        <Collapse in={isTraitsOpen}>
          <Divider />
          <DisplayTraits asteroid={asteroid} />
        </Collapse>
        <ActionRow actions={actionRowConfig} />
      </ListItem>
    );
  });
  return <List>{AsteroidList}</List>;
}
