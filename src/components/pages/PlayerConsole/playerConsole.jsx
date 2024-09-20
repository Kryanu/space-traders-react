import { MODAL_TYPE } from '../../../constants';
import { useContext, useEffect, useState } from 'react';
import { ModalSelector, useAllQueries } from './children';
import NavBar from '../../Layouts/navbar';
import { GameContext } from '../../../context/';
import { Modal, MapSelector, Waypoints, ShipDetails } from '../../organisms';
import { AgentDetails, ModalBar } from '../../molecules';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { setLocationDetails } from './logic';
import { retrieveMapWaypoints } from '../../../hooks/helpers';

export default function PlayerConsole() {
  const { currentShip, selectedWaypoint } = useContext(GameContext);
  const [location, setLocation] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waypoints, setWaypoints] = useState(undefined);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const closeModal = () => setIsModalOpen(false);
  const [modalType, setModalType] = useState(MODAL_TYPE.ships);
  const { contracts, systems, agent, ships } = useAllQueries(token);

  useEffect(() => {
    if (!currentShip) setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (!location && agent) {
      setLocation(setLocationDetails(agent));
    }
  }, [agent]);

  useEffect(() => {
    if (location) {
      retrieveMapWaypoints(token, location.system, undefined, setWaypoints);
    }
  }, [location]);

  return (
    <div className='flex p-8 w-full h-screen space-x-4'>
      <div className='flex flex-col w-1/3 mb-auto pb-2'>
        <NavBar route={'/'} />
        <div className='flex items-stretch justify-between space-x-4'>
          <AgentDetails agent={agent} />
          <ShipDetails ship={currentShip} />
        </div>

        <ModalBar openModal={setIsModalOpen} setModalType={setModalType} />
        <Waypoints
          waypointSymbol={selectedWaypoint.symbol}
          location={location}
          setModalType={setModalType}
          openModal={setIsModalOpen}
        />
      </div>
      <MapSelector
        systems={systems}
        waypoints={waypoints}
        setWaypoints={setWaypoints}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalSelector
          ships={ships}
          contracts={contracts}
          type={modalType}
          closeModal={closeModal}
          token={token}
          location={selectedWaypoint}
        />
      </Modal>
    </div>
  );
}
