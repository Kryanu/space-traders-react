import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import { ShipViewer } from '../../organisms';
import { MODAL_TYPE } from '../../../constants';
import { useQuery } from '@tanstack/react-query';
import {
  retrieveAgent,
  retrieveContracts,
  retrieveShips,
  retrieveSystemsConfig,
} from './logic';
import { useState } from 'react';
import { API } from '../../../api/service';

export const useAllQueries = (token) => {
  const contracts = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => await retrieveContracts(token),
  }).data;
  const systems = useQuery(retrieveSystemsConfig).data;
  const agent = useQuery({
    queryKey: ['agent'],
    queryFn: async () => await retrieveAgent(token),
    refetchOnWindowFocus: false,
  }).data;
  const ships = useQuery({
    queryKey: ['ships'],
    queryFn: async () => await retrieveShips(token),
  }).data;

  return {
    contracts,
    systems,
    agent,
    ships,
  };
};
const acceptContract = async (token, contractId) => {
  try {
    await API.agent.acceptContract(token, contractId);
  } catch (ex) {}
};

function AcceptButton(props) {
  const { accepted, closeModal, token, id } = props;
  if (accepted) return <></>;

  return (
    <ListItemButton
      onClick={async () => {
        try {
          await acceptContract(token, id);
        } catch {}
        closeModal();
      }}
    >
      <ListItemText primary='Accept' />
    </ListItemButton>
  );
}

function ContractIdList(props) {
  const { contracts, token, closeModal } = props;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  if (!Array.isArray(contracts) || contracts.length === 0) {
    return <></>;
  }
  const data = contracts.map((x) => {
    return (
      <ListItem
        sx={{ alignItems: 'start', color: '#32C832' }}
        className='flex flex-col border-2 rounded-md border-map-green mb-2 mr-auto'
        key={x.id}
      >
        <ListItemText>{`Payment on Accepted: ${x.terms?.payment?.onAccepted}`}</ListItemText>
        <ListItemText>{`Payment when Fulfilled: ${x.terms?.payment?.onFulfilled}`}</ListItemText>
        <ListItemButton onClick={() => setIsPaymentOpen(!isPaymentOpen)}>
          <ListItemText primary='View Deliverables' />
        </ListItemButton>
        <Collapse in={isPaymentOpen}>
          <DeliverablesList deliver={x.terms.deliver} />
        </Collapse>
        <AcceptButton
          accepted={x.accepted}
          closeModal={closeModal}
          token={token}
          id={x.id}
        />
      </ListItem>
    );
  });

  return <List sx={{ paddingTop: '0px' }}>{data}</List>;
}

export function ModalSelector(props) {
  const { type, closeModal, contracts, ships, token } = props;
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
          <ContractIdList
            contracts={contracts}
            token={token}
            closeModal={closeModal}
          />
        </div>
      );
  }
  return <></>;
}

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
