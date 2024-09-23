import { Typography } from '@mui/material';

export default function Nav({ nav, fuel }) {
  if (!nav) return <></>;
  const { waypointSymbol, status } = nav;
  const { current, capacity } = fuel;
  return (
    <>
      <Typography variant='h6'>{`Waypoint: ${waypointSymbol}`}</Typography>
      <Typography variant='h6'>{`Status: ${status}`}</Typography>
      <Typography variant='h6'>{`Fuel: ${current} /${capacity}`}</Typography>
    </>
  );
}
