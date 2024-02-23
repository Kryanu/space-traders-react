import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse
} from '@mui/material';

export const ContractList = (contract, hooks, state) => {
  if (!contract) {
    return <></>;
  }
  return (
    <List sx={{ paddingTop: '0px' }}>
      <ListItem
        sx={{ alignItems: 'start' }}
        className='flex flex-col border-2 rounded-md border-slate-300 mb-2'
      >
        <ListItemText>{`Faction Symbol: ${contract.factionSymbol}`}</ListItemText>
        <ListItemText>{`Type: ${contract.type}`}</ListItemText>
        <ListItemButton
          onClick={() => hooks.setOpenPaymentsList(!state.openPaymentsList)}
        >
          <ListItemText primary='Payment Details' />
        </ListItemButton>
        <Collapse in={state.openPaymentsList}>
          {PaymentDetails(contract.terms)}
        </Collapse>
        <ListItemButton
          onClick={() =>
            hooks.setOpenDeliverablesList(!state.openDeliverablesList)
          }
        >
          <ListItemText primary='Deliverables Details' />
        </ListItemButton>
        <Collapse in={state.openDeliverablesList}>
          {DeliverablesList(contract.terms)}
        </Collapse>

        <ListItemText>{`Accepted?: ${contract.accepted}`}</ListItemText>
        <ListItemText>{`Fulfilled?: ${contract.fulfilled}`}</ListItemText>
        <ListItemText>{`Expiration Date: ${contract.expiration}`}</ListItemText>
      </ListItem>
    </List>
  );
};

export const DeliverablesList = (terms) => {
  const { deliver } = terms;
  const data = deliver.map((x) => {
    return (
      <ListItem
        key={x.destinationSymbol}
        sx={{ alignItems: 'start' }}
        className='flex flex-col'
      >
        <ListItemText>{`TradeSymbol: ${x.tradeSymbol}`}</ListItemText>
        <ListItemText>{`Destination ${x.destinationSymbol}`}</ListItemText>
        <ListItemText>{`Units: ${x.unitsRequired}`}</ListItemText>
        <ListItemText>{`Fulfilled: ${x.unitsFulfilled}`}</ListItemText>
      </ListItem>
    );
  });
  return <List>{data}</List>;
};

export const PaymentDetails = (terms) => {
  const { payment } = terms;
  return (
    <List>
      <ListItem className='flex flex-col'>
        <ListItemText>{`When Accepted: ${payment.onAccepted}`}</ListItemText>
        <ListItemText>{`When Fulfilled: ${payment.onFulfilled}`}</ListItemText>
      </ListItem>
    </List>
  );
};