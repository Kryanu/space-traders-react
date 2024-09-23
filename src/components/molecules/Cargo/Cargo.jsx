import { useState } from 'react';
import { isValidArray } from '../../../hooks';
import {
  Collapse,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
export default function Cargo({ cargo }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!cargo || !isValidArray(cargo?.inventory))
    return <Typography variant='h6'>Cargo: Empty</Typography>;
  const { inventory, units, capacity } = cargo;
  const inventoryDetails = inventory.map(({ name, units }, index) => {
    return (
      <Typography key={index}>{`${name}: ${units}/${capacity}`}</Typography>
    );
  });

  return (
    <>
      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary='Show Cargo' />
      </ListItemButton>
      <Collapse in={isOpen}>
        <Typography>{`Cargo ${units}/${capacity}`}</Typography>
        {inventoryDetails}
      </Collapse>
    </>
  );
}
