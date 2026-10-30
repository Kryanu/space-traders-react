import { List, ListItem, Collapse, Divider } from '@mui/material';
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
import type {
  Contract,
  ContractDeliverable,
  Market,
  MarketItem,
  MarketTrait,
  Ship,
  Waypoint,
} from '@types';

type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export function useAllQueries(token: string) {
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
}

async function acceptContract(token: string, contractId: string) {
  try {
    await API.agent.acceptContract(token, contractId);
  } catch (ex) {}
}

function ContractIdList(props: {
  contracts: Contract[] | undefined;
  token: string;
  closeModal: () => void;
}) {
  const { contracts, token, closeModal } = props;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  if (!contracts || contracts.length === 0) {
    return <></>;
  }

  const data = contracts.map((x) => {
    return (
      <ListItem
        sx={{ alignItems: 'start', color: '#32C832' }}
        className='flex flex-col border-2 rounded-md border-map-green mb-2 mr-auto'
        key={x.id}
      >
        <p>{`Payment on Accepted: ${x.terms?.payment?.onAccepted}`}</p>
        <p>{`Payment when Fulfilled: ${x.terms?.payment?.onFulfilled}`}</p>
        <button onClick={() => setIsPaymentOpen(!isPaymentOpen)}>
          <p>View Deliverables</p>
        </button>
        <Collapse in={isPaymentOpen}>
          <DeliverablesList deliver={x.terms.deliver} />
        </Collapse>
        {!x.accepted && (
          <button
            onClick={async () => {
              try {
                await acceptContract(token, x.id);
              } catch {}
              closeModal();
            }}
          >
            Accept
          </button>
        )}
      </ListItem>
    );
  });

  return <List sx={{ paddingTop: '0px' }}>{data}</List>;
}

interface ModalSelectorProps {
  type: ModalType;
  closeModal: () => void;
  contracts: Contract[] | undefined;
  ships: Ship[] | undefined;
  token: string;
  location: Waypoint | undefined;
}

export function ModalSelector(props: ModalSelectorProps) {
  const queryClient = useQueryClient();
  const { type, closeModal, contracts, ships, token, location } = props;

  switch (type) {
    case MODAL_TYPE.ships:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <p>Select a Ship</p>
          <ShipViewer ships={ships ?? []} closeModal={closeModal} />
        </div>
      );
    case MODAL_TYPE.contracts:
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <p>Select a Contract</p>
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
          <p>Buy a Ship</p>
          <ShipListing waypoint={location} closeModal={closeModal} />
        </div>
      );
    case MODAL_TYPE.markets:
      const market = queryClient.getQueryData<Market>(['market']);
      return (
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <p>Marketplace</p>
          <Marketplace market={market} />
        </div>
      );
  }
  return <></>;
}

function MarketTraits(props: MarketTrait) {
  const { data, title } = props;
  const [show, setShow] = useState(false);
  let message = 'Show';

  if (data.length === 0) return <></>;
  if (show) {
    message = 'Hide';
  }
  const list = data.map((item: MarketItem, index: number) => {
    return <p key={index}>{item.name}</p>;
  });

  return (
    <>
      <p>{title}</p>
      <button
        style={{ color: '#32C832' }}
        onClick={() => {
          setShow(!show);
        }}
      >
        {message}
      </button>
      <Collapse in={show}>{list}</Collapse>
    </>
  );
}

function Marketplace({ market }: { market: Market | undefined }) {
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

function DeliverablesList(props: { deliver: ContractDeliverable[] }) {
  const { deliver } = props;
  const data = deliver.map((x) => {
    return (
      <ListItem
        key={x.destinationSymbol}
        sx={{ alignItems: 'start' }}
        className='flex flex-col'
      >
        <p>{`TradeSymbol: ${x.tradeSymbol}`}</p>
        <p>{`Destination ${x.destinationSymbol}`}</p>
        <p>{`Units: ${x.unitsRequired}`}</p>
        <p>{`Fulfilled: ${x.unitsFulfilled}`}</p>
      </ListItem>
    );
  });
  return <List>{data}</List>;
}
