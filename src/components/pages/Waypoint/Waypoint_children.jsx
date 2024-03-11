import {
  ListItem,
  List,
} from '@mui/material';
import {
  timedNavigateShip,
  dockShip,
  refuelShip,
  orbitShip,
  mineAsteroid,
} from './Waypoint_logic';
import { ActionRow, Traits } from '../../molecules/index';
import { useState, useContext } from 'react';
import { TokenContext, GameContext } from '../../../context';

export function Waypoint(props) {
  const { asteroids, setTime } = props;
  const { token } = useContext(TokenContext);
  const { ships, setIsToastVisible } = useContext(GameContext);
  const [isTraitsOpen, setIsTraitsOpen] = useState(false);
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
        <Traits
          waypoint={waypoint}
          isOpen={isTraitsOpen}
          setIsOpen={setIsTraitsOpen}
        />
        <ActionRow actions={actionRowConfig} />
      </ListItem>
    </List>
  );
}
