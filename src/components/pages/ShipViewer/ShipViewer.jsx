import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../../context';
import { API } from '../../../api/service';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { Ships } from './ShipViewer_children';

export default function ShipViewer(props) {
  const { closeModal } = props;
  const [ships, setShips] = useState(undefined);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const { setCurrentShip } = useContext(GameContext);
  useEffect(() => {
    retrieveShips(token, setShips);
  }, []);
  return (
    <Ships
      ships={ships}
      setShip={setCurrentShip}
      closeModal={closeModal}
    />
  );
}

const retrieveShips = async (token, setShips) => {
  setShips(await API.fleet.getShips(token));
};
