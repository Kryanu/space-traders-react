import { Typography } from '@mui/material';

export default function Nav(props) {
  const { nav, fuel } = props;
  if (!nav) return <></>;

  return (
    <>
      <Typography variant='h6'>{`Waypoint: ${nav.waypointSymbol}`}</Typography>
      <Typography variant='h6'>{`Status: ${nav.status}`}</Typography>
      <Typography variant='h6'>{`Fuel: ${fuel.current} /${fuel.capacity}`}</Typography>
    </>
  );
}
