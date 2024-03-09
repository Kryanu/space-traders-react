import { useState, useEffect, useContext } from 'react';
import { retrieveAllShips } from './ShipShop_logic';
import { ShipyardList } from './ShipShip_children';
import { NavBar } from '../../Layouts';
import { TokenContext, GameContext } from '../../../context';
export default function ShipShop() {
  const [shipyards, setShipYards] = useState(undefined);
  const { location, setShips } = useContext(GameContext);
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (location) {
      retrieveAllShips(token, location.system, setShipYards);
    }
  }, [location]);

  return (
    <div className='flex flex-col items-center'>
      <NavBar route={'/console'} />
      <ShipyardList shipyards={shipyards} updateShips={setShips} />
    </div>
  );
}
