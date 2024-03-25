import { ListItem, List } from '@mui/material';
import { actionsConfig } from './Waypoint_logic';
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
        <ActionRow actions={actionsConfig(actionProps, waypoint, setTime)} />
      </ListItem>
    </List>
  );
}
