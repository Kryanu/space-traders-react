import { useState, useEffect, useContext } from 'react';
import { retrieveAllShips } from './ShipShop_logic';
import { ShipyardList } from './ShipShip_children';
import { NavBar } from '../../Layouts';
import { TokenContext, GameContext } from '../../../context';
export default function ShipShop() {
  const [shipyards, setShipYards] = useState(undefined);
  const { location, updateShips } = useContext(GameContext);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (location) {
      retrieveAllShips(token, location.system, setShipYards);
    }
  }, [location]);

  return (
    <div>
      <NavBar route={'/console'} />
      <ShipyardList shipyards={shipyards} updateShips={updateShips} />
    </div>
  );
}
