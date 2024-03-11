import { ListItemText } from '@mui/material';
import { isValidArray } from '../../../hooks';

export function TraitDetails(props) {
  const { traits } = props;
  if (!isValidArray(traits)) return <></>;

  return traits.map((trait, index) => {
    return (
      <ListItemText
        key={index}
        style={{ color: '#32C832' }}
        primary={` - ${trait.name}`}
      />
    );
  });
}
