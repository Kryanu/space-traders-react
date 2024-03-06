import { useEffect, useState } from 'react';
import { gameDataStore, userDataStore } from '../../../stores';
import { retrieveMarkets } from './markets_logic';
import { Typography } from '@mui/material';
import { Actions } from './markets_children';
import NavBar from '../../Layouts/navbar';
export default function Markets() {
  const { token } = userDataStore();
  const { location, ships } = gameDataStore();
  const [markets, setMarkets] = useState(undefined);
  useEffect(() => {
    if (token) {
      retrieveMarkets(token, location.system, setMarkets);
    }
  }, [token]);

  const data = (markets) => {
    if (!markets) {
      return <></>;
    }
    return markets.map((market, index) => {
      return (
        <div
          key={index}
          className='flex flex-col text-left m-2 p-2 border-2 rounded-md border-slate-300 mb-2'
        >
          <Typography>{`Symbol:${market.symbol}`}</Typography>
          <Typography>{`Type:${market.type}`}</Typography>
          {Actions(token, ships.symbol, market, ships.cargo)}
        </div>
      );
    });
  };

  return (
    <div className='flex flex-col items-center'>
      <NavBar route={'/console'} />
      <div className='flex flex-wrap justify-center'>{data(markets)}</div>
    </div>
  );
}
