import { API } from '../../../api/service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { ListItemButton, Typography } from '@mui/material';
const retrieveAvailableShips = async (token, system, symbol) => {
  return await API.system.getShipyard(token, system, symbol);
};

function ShipDetails(props) {
  const { ships, symbol, closeModal, token, client } = props;

  const data = ships.map((ship, index) => {
    return (
      <div
        key={index}
        className='text-left p-4 border-2 rounded-md border-map-green m-2'
      >
        <Typography> {`Type: ${ship.name}`}</Typography>
        <Typography> {`Price: ${ship.purchasePrice}`}</Typography>
        <ListItemButton
          onClick={async () => {
            await API.fleet.purchaseShip(token, ship.type, symbol);
            client.invalidateQueries('agent');
            closeModal();
          }}
          sx={{ color: '#A8A8A8' }}
        >
          Buy This
        </ListItemButton>
      </div>
    );
  });

  return <div className='flex mt-4'>{data}</div>;
}

export default function ShipListing({ waypoint, closeModal }) {
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
