import { useState } from 'react';
import { isValidArray } from '../../../hooks';
import {
  Collapse,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
export default function Cargo(props) {
  const { cargo } = props;
  const [isOpen, setIsOpen] = useState(false);

  if (!cargo || !isValidArray(cargo?.inventory))
    return (
      <>
        <Typography variant='h6'>Cargo: Empty</Typography>
      </>
    );
  const inventory = cargo?.inventory.map((item, index) => {
    return (
      <Typography
        key={index}
      >{`${item.name}: ${item.units}/${cargo.capacity}`}</Typography>
    );
  });

  return (
    <>
      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary='Show Cargo' />
      </ListItemButton>
      <Collapse in={isOpen}>
        <Typography>{`Cargo ${cargo.units}/${cargo.capacity}`}</Typography>
        {inventory}
      </Collapse>
    </>
  );
}
