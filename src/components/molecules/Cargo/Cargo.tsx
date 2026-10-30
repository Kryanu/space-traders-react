import { useState } from 'react';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import type { CargoData } from '@types';

export default function Cargo({ cargo }: { cargo?: CargoData | undefined }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!cargo || cargo?.inventory.length === 0) return <p>Cargo: Empty</p>;

  const { inventory, units, capacity } = cargo;
  
  const inventoryDetails = inventory.map(({ name, units }, index) => {
    return <p key={index}>{`${name}: ${units}/${capacity}`}</p>;
  });

  return (
    <>
      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary='Show Cargo' />
      </ListItemButton>
      <Collapse in={isOpen}>
        <p>{`Cargo ${units}/${capacity}`}</p>
        {inventoryDetails}
      </Collapse>
    </>
  );
}
