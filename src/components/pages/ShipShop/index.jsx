import { useState, useEffect } from 'react';
import { gameDataStore, userDataStore } from '../../../stores';
import { retrieveAllShips } from './logic';
import { display } from '../../../hooks';
import { ShipyardList } from './children';
import { NavBar } from '../../Layouts';
export default function ShipShop() {
  const [shipyards, setShipYards] = useState(undefined);
  const { location, updateShips } = gameDataStore();
  const { token } = userDataStore();

  useEffect(() => {
    if (location) {
      retrieveAllShips(token, location.system, setShipYards);
    }
  }, [location]);

  return (
    <div>
      <NavBar route={'/console'} />
      {ShipyardList(shipyards, token, updateShips)}
    </div>
  );
}
