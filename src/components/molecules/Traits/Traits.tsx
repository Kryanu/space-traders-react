import { Collapse, Divider } from '@mui/material';
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

      <button onClick={() => setIsOpen(!isOpen)}>
        <p style={{ color: '#32C832' }}>Traits</p>
      </button>
      <Collapse in={isOpen}>
        <Divider />
        {traitDetails}
      </Collapse>
    </>
  );
}
