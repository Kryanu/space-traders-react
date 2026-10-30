import { Collapse, Divider, ListItemButton } from '@mui/material';
import { isValidArray } from '../../../hooks';
import type { Dispatch, SetStateAction } from 'react';
import { Waypoint } from '@types';

interface TraitsProps {
  waypoint: Waypoint;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Traits({ waypoint, isOpen, setIsOpen }: TraitsProps) {
  if (waypoint.traits.length === 0) {
    return null;
  }

  const { traits, symbol, type } = waypoint;

  const traitDetails = traits.map((trait, index) => {
    return <p key={index}>{`- ${trait.name}`}</p>;
  });

  return (
    <>
      <p>{`Name: ${symbol}`}</p>
      <p>{`Type: ${type}`}</p>

      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <p style={{ color: '#32C832' }}>Traits</p>
      </ListItemButton>
      <Collapse in={isOpen}>
        <Divider />
        {traitDetails}
      </Collapse>
    </>
  );
}
