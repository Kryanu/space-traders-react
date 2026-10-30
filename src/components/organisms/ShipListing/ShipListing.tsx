import { API } from '../../../api/service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import type { Waypoint } from '@types';

interface AvailableShip {
  type: string;
  name: string;
  purchasePrice: number;
}

interface ShipListingItemProps {
  ships: AvailableShip[];
  symbol: string;
  closeModal: () => void;
  token: string;
}

interface ShipListingProps {
  waypoint: Waypoint | undefined;
  closeModal: () => void;
}

const retrieveAvailableShips = async (
  token: string,
  system: string,
  symbol: string,
): Promise<{ ships: AvailableShip[] }> => {
  return await API.system.getShipyard(token, system, symbol);
};

function ShipDetails(props: ShipListingItemProps) {
  const { ships, symbol, closeModal, token } = props;
  const client = useQueryClient();

  const data = ships.map((ship, index) => {
    return (
      <div
        key={index}
        className='text-left p-4 border-2 rounded-md border-map-green m-2'
      >
        <p> {`Type: ${ship.name}`}</p>
        <p> {`Price: ${ship.purchasePrice}`}</p>
        <button
          onClick={async () => {
            await API.fleet.purchaseShip(token, ship.type, symbol);
            client.invalidateQueries({ queryKey: ['agent'] });
            closeModal();
          }}
          style={{ color: '#A8A8A8' }}
        >
          Buy This
        </button>
      </div>
    );
  });

  return <div className='flex mt-4'>{data}</div>;
}

export default function ShipListing({
  waypoint,
  closeModal,
}: ShipListingProps) {
  const queryClient = useQueryClient();
  const token = toToken(queryClient);

  if (!waypoint) return <></>;

  const { symbol } = waypoint;

  const symbols = symbol.split('-');
  const systemSymbol = `${symbols[0]}-${symbols[1]}`;

  const availableShips = useQuery({
    queryKey: ['availableShips'],
    queryFn: async () =>
      await retrieveAvailableShips(token, systemSymbol, symbol),
  }).data?.ships;

  if (!availableShips) return <></>;
  return (
    <ShipDetails
      ships={availableShips}
      symbol={symbol}
      closeModal={closeModal}
      token={token}
    />
  );
}
