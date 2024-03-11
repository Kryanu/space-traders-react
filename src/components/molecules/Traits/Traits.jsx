import { ListItemText, Collapse, Divider, ListItemButton } from '@mui/material';
import { isValidArray } from '../../../hooks';
export default function Traits(props) {
  const { waypoint, isOpen, setIsOpen } = props;
  if (!waypoint.traits && isValidArray(waypoint.traits)) {
    return <></>;
  }
  const traits = waypoint.traits.map((trait, index) => {
    return <ListItemText key={index}>{`- ${trait.name}`}</ListItemText>;
  });

  return (
    <>
      <ListItemText primary={`Name: ${waypoint.symbol}`} />
      <ListItemText primary={`Type: ${waypoint.type}`} />
      <ListItemButton onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary='Traits' style={{ color: '#32C832' }} />
      </ListItemButton>
      <Collapse in={isOpen}>
        <Divider />
        {traits}
      </Collapse>
    </>
  );
}
