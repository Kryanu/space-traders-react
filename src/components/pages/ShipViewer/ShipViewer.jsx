import { useContext } from 'react';
import { GameContext } from '../../../context';
import { Ships } from './ShipViewer_children';

export default function ShipViewer(props) {
  const { closeModal, ships } = props;
  const { setCurrentShip } = useContext(GameContext);
  return (
    <Ships ships={ships} setShip={setCurrentShip} closeModal={closeModal} />
  );
}
