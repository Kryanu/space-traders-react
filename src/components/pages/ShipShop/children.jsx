import { ListItem, ListItemText, List } from '@mui/material';
import { isValidArray } from '../../../hooks';
import { NavigateButton } from '../../atoms';
import { purchaseShip } from './logic';
export const ShipyardList = (shipyards, token) => {
  if (!isValidArray(shipyards)) {
    return <></>;
  }
  const data = shipyards.map((shipyard) => {
    return ShipList(shipyard.ships, token, shipyard.symbol);
  });

  return <List>{data}</List>;
};

export const ShipList = (ships, token, waypoint) => {
  if (!isValidArray(ships)) {
    return <></>;
  }

  return ships.map((ship, index) => {
    return (
      <ListItem
        sx={{ alignItems: 'start' }}
        className='flex flex-col border-2 rounded-md border-slate-300 mb-2'
        key={index}
      >
        <ListItemText>{`Name: ${ship.name}`}</ListItemText>
        <ListItemText>{`Type: ${ship.type}`}</ListItemText>
        <ListItemText>{`Purchase Price: ${ship.purchasePrice}`}</ListItemText>
        <NavigateButton
          callBack={purchaseShip}
          callBackProps={{ token, shipType: ship.type, waypoint }}
          route={'/console'}
          style={{}}
          text={'Purchase'}
        />
      </ListItem>
    );
  });
};
