import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

export const AgentDetails = (agent) => {  
  if (!agent) {
    return <></>;
  }
  return (
    <div className='flex flex-col rounded-md border-2 border-slate-300 p-4 mx-auto'>
      <Typography variant='h6'>{`Symbol: ${agent.symbol}`}</Typography>
      <Typography variant='h6'>{`HQ Coordinates: ${agent.headquarters}`}</Typography>
      <Typography variant='h6'>{`Credits: ${agent.credits}`}</Typography>
      <Typography variant='h6'>{`Faction: ${agent.startingFaction}`}</Typography>
      <Typography variant='h6'>{`Ships: ${agent.shipCount}`}</Typography>
    </div>
  );
};

export const ContractIdList = (contracts, setContractId) => {
  if (!Array.isArray(contracts) || contracts.length === 0) {
    return <></>;
  }

  const data = contracts.map((x) => {
    return (
      <ListItem
        sx={{ alignItems: 'start' }}
        className='flex flex-col border-2 rounded-md border-slate-300 mb-2'
        key={x.id}
      >
        <ListItemText>{`Payment on Accepted: ${x.terms?.payment?.onAccepted}`}</ListItemText>
        <ListItemText>{`Payment when Fulfilled: ${x.terms?.payment?.onFulfilled}`}</ListItemText>
        <ListItemButton
          onClick={() => {
            setContractId(x.id);
          }}
        >
          <ListItemText primary='View Details' />
        </ListItemButton>
      </ListItem>
    );
  });

  return <List sx={{ paddingTop: '0px' }}>{data}</List>;
};
