import {
  ListItem,
  List,
  ListItemText,
  Collapse,
  ListItemButton,
  Divider,
} from '@mui/material';
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
  debugger;
  const waypoint = asteroids;
  if (!asteroids || !token) {
    return <></>;
  }
  let shipSymbol = ships?.symbol;
  const actionProps = { token, shipSymbol, setIsToastVisible };
  const actionRowConfig = [
    {
      text: 'Fly To',
      callBack: timedNavigateShip,
      callBackProps: {
        waypointSymbol: waypoint.symbol,
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
    <List>
      <ListItem
        sx={{ alignItems: 'start', color: '#32C832' }}
        className='flex flex-col border-2 rounded-md border-map-green mb-2'
      >
        <ListItemText>{`Symbol ${waypoint.symbol}`}</ListItemText>
        <ListItemText>{`Type ${waypoint.type}`}</ListItemText>
        <ListItemButton onClick={() => setIsTraitsOpen(!isTraitsOpen)}>
          <ListItemText primary='Traits' style={{ color: '#32C832' }} />
        </ListItemButton>
        <Collapse in={isTraitsOpen}>
          <Divider />
          <DisplayTraits asteroid={waypoint} />
        </Collapse>
        <ActionRow actions={actionRowConfig} />
      </ListItem>
    </List>
  );
}
