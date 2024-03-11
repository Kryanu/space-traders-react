import { orbitShip, dockShip, sellCargo } from './markets_logic';
import { navigateShip } from '../../../hooks/helpers';
import ActionRow from '../../molecules/ActionRow/ActionRow';
import { Typography } from '@mui/material';
import { TokenContext, GameContext } from '../../../context/';
import { useContext } from 'react';
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

export function MarketList(props) {
  const { markets } = props;
  const { token } = useContext(TokenContext);
  const { currentShip } = useContext(GameContext);
  if (!markets) {
    return <></>;
  }
  return markets.map((market, index) => {
    return (
      <div
        key={index}
        className='flex flex-col text-left m-2 p-2 border-2 rounded-md border-map-green mb-2'
      >
        <Typography color={'#32C832'}>{`Symbol:${market.symbol}`}</Typography>
        <Typography color={'#32C832'}>{`Type:${market.type}`}</Typography>
        {Actions(token, currentShip.symbol, market, currentShip.cargo)}
      </div>
    );
  });
}
