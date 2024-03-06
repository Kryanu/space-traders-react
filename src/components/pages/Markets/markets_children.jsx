import { Button } from '@mui/material';
import { navigateShip, orbitShip, dockShip, sellCargo } from './markets_logic';
import ActionRow from '../../molecules/ActionRow/ActionRow';
export const Actions = (token, shipSymbol, market, cargo) => {
  const actionRowConfig = [
    {
      text: 'Fly to',
      callBack: navigateShip,
      callBackProps: { token, shipSymbol, waypointSymbol: market.symbol },
    },
    {
      text: 'Dock',
      callBack: dockShip,
      callBackProps: { token, shipSymbol },
    },
    {
      text: 'Orbit',
      callBack: orbitShip,
      callBackProps: { token, shipSymbol },
    },
    {
      text: 'Sell Cargo',
      callBack: sellCargo,
      callBackProps: { token, shipSymbol, cargo },
    },
  ];
  return <ActionRow actions={actionRowConfig} />;
};
