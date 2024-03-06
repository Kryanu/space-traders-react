import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';

function DeliverablesList(props) {
  const { deliver } = props;
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
}

function PaymentDetails(props) {
  const { payment } = props;
  return (
    <List>
      <ListItem className='flex flex-col'>
        <ListItemText>{`When Accepted: ${payment.onAccepted}`}</ListItemText>
        <ListItemText>{`When Fulfilled: ${payment.onFulfilled}`}</ListItemText>
      </ListItem>
    </List>
  );
}

export function ContractList(props) {
  const { contract, hooks, state } = props;

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
          <PaymentDetails payment={contract.terms.payment} />
        </Collapse>
        <ListItemButton
          onClick={() =>
            hooks.setOpenDeliverablesList(!state.openDeliverablesList)
          }
        >
          <ListItemText primary='Deliverables Details' />
        </ListItemButton>
        <Collapse in={state.openDeliverablesList}>
          <DeliverablesList deliver={contract.terms.deliver} />
        </Collapse>

        <ListItemText>{`Accepted?: ${contract.accepted}`}</ListItemText>
        <ListItemText>{`Fulfilled?: ${contract.fulfilled}`}</ListItemText>
        <ListItemText>{`Expiration Date: ${contract.expiration}`}</ListItemText>
      </ListItem>
    </List>
  );
}
