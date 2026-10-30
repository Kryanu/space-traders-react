import { ListItem, List } from '@mui/material';
import { actionsConfig } from './Waypoint_logic';
import { ActionRow, Traits } from '../../molecules/index';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useGameContext } from '../../../context';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { MODAL_TYPE } from '../../../constants';
import type { Waypoint as WaypointData } from '@types';

type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

interface WaypointProps {
  asteroids: WaypointData;
  setTime: Dispatch<SetStateAction<number | string>>;
  setModalType: Dispatch<SetStateAction<ModalType>>;
  openModal: (open: boolean) => void;
}

export function Waypoint(props: WaypointProps) {
  const { asteroids, setTime, setModalType, openModal } = props;
  const { currentShip, setCurrentShip, setIsToastVisible } = useGameContext();
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
        <ActionRow
          actions={actionsConfig(
            actionProps,
            waypoint,
            setTime,
            currentShip?.nav?.waypointSymbol,
            setCurrentShip,
            currentShip,
            setModalType,
            openModal
          )}
        />
      </ListItem>
    </List>
  );
}
