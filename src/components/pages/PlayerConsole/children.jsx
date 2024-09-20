import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
} from '@mui/material';
import { ShipListing, ShipViewer } from '../../organisms';
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
import { useQueryClient } from '@tanstack/react-query';
import { isValidArray } from '../../../hooks';

export const useAllQueries = (token, system, waypoint) => {
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
  const queryClient = useQueryClient();
  const { type, closeModal, contracts, ships, token, location } = props;

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
    case MODAL_TYPE.shipyard:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Buy a Ship</Typography>
          <ShipListing waypoint={location} closeModal={closeModal} />
        </div>
      );
    case MODAL_TYPE.markets:
      const market = queryClient.getQueryData(['market']);
      console.log(market);
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Marketplace</Typography>
          <Marketplace market={market} />
        </div>
      );
  }
  return <></>;
}

const mapArrayToText = (arr) => {
  return arr.map((item, index) => {
    return (
      <Typography sx={{ textAlign: 'left', paddingLeft: '1.5rem' }} key={index}>
        {item.name}
      </Typography>
    );
  });
};

function MarketTraits(props) {
  const { data, title } = props;
  const [show, setShow] = useState(false);
  let message = 'Show';
  if (!isValidArray(data)) return <></>;
  if (show) {
    message = 'Hide';
  }
  const list = data.map((item, index) => {
    return (
      <Typography sx={{ textAlign: 'left', paddingLeft: '1.5rem' }} key={index}>
        {item.name}
      </Typography>
    );
  });

  return (
    <>
      <Typography>{title}</Typography>
      <ListItemButton
        sx={{ color: '#32C832' }}
        onClick={() => {
          setShow(!show);
        }}
      >
        {message}
      </ListItemButton>
      <Collapse in={show}>{list}</Collapse>
    </>
  );
}

function Marketplace(props) {
  const { market } = props;
  if (!market) return <></>;

  return (
    <div className='flex flex-col text-left'>
      <MarketTraits data={market.exchange} title={'Exchange:'} />
      <Divider />
      <MarketTraits data={market.exports} title={'Exports:'} />
      <Divider />
      <MarketTraits data={market.imports} title={'Imports:'} />
    </div>
  );
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
