import { useEffect, useState, useContext } from 'react';
import { retrieveMarkets } from './markets_logic';
import { MarketList } from './markets_children';
import NavBar from '../../Layouts/navbar';
import { TokenContext, GameContext } from '../../../context/';
export default function Markets() {
  const { location } = useContext(GameContext);
  const [markets, setMarkets] = useState(undefined);
  useEffect(() => {
    retrieveMarkets(location.system, setMarkets);
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <NavBar route={'/console'} />
      <div className='flex flex-wrap justify-center'>
        <MarketList markets={markets} />
      </div>
    </div>
  );
}
