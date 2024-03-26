import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { ShipViewer } from '../index';
import { MODAL_TYPE } from '../../../constants';

function ContractIdList(props) {
  const { contracts } = props;
  if (!Array.isArray(contracts) || contracts.length === 0) {
    return <></>;
  }

  const data = contracts.map((x) => {
    return (
      <ListItem
        sx={{ alignItems: 'start', color: '#32C832' }}
        className='flex flex-col border-2 rounded-md border-map-green mb-2'
        key={x.id}
      >
        <ListItemText>{`Payment on Accepted: ${x.terms?.payment?.onAccepted}`}</ListItemText>
        <ListItemText>{`Payment when Fulfilled: ${x.terms?.payment?.onFulfilled}`}</ListItemText>
        <ListItemButton onClick={() => {}}>
          <ListItemText primary='View Details' />
        </ListItemButton>
      </ListItem>
    );
  });

  return <List sx={{ paddingTop: '0px' }}>{data}</List>;
}

export function ModalSelector(props) {
  const { type, closeModal, contracts, ships } = props;
  switch (type) {
    case MODAL_TYPE.ships:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Select a Ship</Typography>
          <ShipViewer ships={ships} closeModal={closeModal} />
        </div>
      );
    case MODAL_TYPE.contracts:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Select a Contract</Typography>
          <ContractIdList contracts={contracts} />
        </div>
      );
  }
  return <></>;
}
