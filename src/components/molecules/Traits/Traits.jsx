import { ListItemText, Collapse, Divider, ListItemButton } from '@mui/material';
import { isValidArray } from '../../../hooks';
export default function Traits({ waypoint, isOpen, setIsOpen }) {
  if (!waypoint.traits && isValidArray(waypoint.traits)) {
    return <></>;
  }
  const { traits, symbol, type } = waypoint;

  const traitDetails = traits.map((trait, index) => {
    return <ListItemText key={index}>{`- ${trait.name}`}</ListItemText>;
  });

  return (
    <>
      <ListItemText primary={`Name: ${symbol}`} />
      <ListItemText primary={`Type: ${type}`} />
      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary='Traits' style={{ color: '#32C832' }} />
      </ListItemButton>
      <Collapse in={isOpen}>
        <Divider />
        {traitDetails}
      </Collapse>
    </>
  );
}
