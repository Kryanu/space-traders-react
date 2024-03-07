import { ListItem, ListItemText, List } from '@mui/material';
import { isValidArray } from '../../../hooks';
import { NavigateButton } from '../../atoms';
import { purchaseShip } from './ShipShop_logic';
import { TokenContext } from '../../../context/TokenContext';
import { useContext } from 'react';
import { GameContext } from '../../../context';
export function ShipyardList(props) {
  const { shipyards, updateShips } = props;
  const { token } = useContext(TokenContext);
  const { setIsToastVisible } = useContext(GameContext);
  if (!isValidArray(shipyards)) {
    return <></>;
  }
  const shipList = shipyards.map((shipyard) => {
    return ShipList(
      shipyard.ships,
      token,
      shipyard.symbol,
      updateShips,
      setIsToastVisible
    );
  });

  return <List>{shipList}</List>;
}

const ShipList = (ships, token, waypoint, updateShips, setIsToastVisible) => {
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
          callBackProps={{
            token,
            shipType: ship.type,
            waypoint,
            updateShips,
            setIsToastVisible,
          }}
          route={'/console'}
          style={{}}
          text={'Purchase'}
        />
      </ListItem>
    );
  });
};
