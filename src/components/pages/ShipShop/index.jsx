import { useState, useEffect } from 'react';
import { gameDataStore, userDataStore } from '../../../stores';
import { setLocationDetails, retrieveAllShips } from './logic';
import { display } from '../../../hooks';
import { ShipyardList } from './children';
export default function ShipShop() {
  const [shipyards, setShipYards] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const { agent } = gameDataStore();
  const { token } = userDataStore();

  useEffect(() => {
    if (!location && agent) {
      setLocation(setLocationDetails(agent));
    }
  }, []);

  useEffect(() => {
    if (location) {
      retrieveAllShips(token, location.system, setShipYards);
    }
  }, [location]);
  display(shipyards);
  return <div>{ShipyardList(shipyards, token)}</div>;
}
