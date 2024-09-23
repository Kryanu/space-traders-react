import { Typography } from '@mui/material';

const detailMapping = {
  symbol: 'Symbol',
  headquarters: 'HQ Coordinates',
  credits: 'Credits',
  startingFaction: 'Faction',
  shipCount: 'Ships',
};

export default function AgentDetails({ agent }) {
  if (!agent) {
    return <></>;
  }

  const keys = Object.keys(agent).filter((item) => item !== 'accountId');
  const details = keys.map((item, index) => {
    return (
      <Typography
        color={'#32C832'}
        variant='h6'
        key={index}
      >{`${detailMapping[item]}: ${agent[item]}`}</Typography>
    );
  });

  return (
    <div className='flex flex-col text-left rounded-md border-2 border-map-green p-4 '>
      {details}
    </div>
  );
}
