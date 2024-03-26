import { Typography } from '@mui/material';
import { Nav, Cargo } from '../../molecules'

export default function ShipDetails(props) {
  const { ship } = props;

  if (!ship) return <></>;
  return (
    <div className='flex flex-col p-4 text-left bg-blackie border-2 border-map-green text-map-green rounded-md grow'>
      <Typography variant='h6'> {`Name: ${ship.symbol}`}</Typography>
      <Nav nav={ship.nav} fuel={ship.fuel} />
      <Cargo cargo={ship.cargo} />
    </div>
  );
}
