import { ListItem, List } from '@mui/material';
import {
  timedNavigateShip,
  dockShip,
  refuelShip,
  orbitShip,
  mineAsteroid,
} from './Waypoint_logic';
import { ActionRow, Traits } from '../../molecules/index';
import { useState, useContext } from 'react';
import { GameContext } from '../../../context';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';

export function Waypoint(props) {
  const { asteroids, setTime } = props;
  const { currentShip, setIsToastVisible } = useContext(GameContext);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const [isTraitsOpen, setIsTraitsOpen] = useState(false);
  const waypoint = asteroids;
  if (!asteroids || !token) {
    return <></>;
  }
  let shipSymbol = currentShip?.symbol;
  const actionProps = { token, shipSymbol, setIsToastVisible, queryClient };
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
      text: 'refuel Ship',
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
        className='flex flex-col rounded-md '
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
