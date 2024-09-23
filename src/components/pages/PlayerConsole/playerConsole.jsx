import { MODAL_TYPE } from '../../../constants';
import { useContext, useEffect, useState } from 'react';
import { ModalSelector, useAllQueries } from './children';
import NavBar from '../../Layouts/navbar';
import { GameContext } from '../../../context/';
import { Modal, MapSelector, Waypoints, ShipDetails } from '../../organisms';
import { ActionRow, AgentDetails, ModalBar } from '../../molecules';
import { useQueryClient } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { setLocationDetails } from './logic';
import { retrieveMapWaypoints } from '../../../hooks/helpers';
import {
  orbitShip,
  dockShip,
  refuelShip,
  mineAsteroid,
} from '../../organisms/Waypoint/Waypoint_logic';

export default function PlayerConsole() {
  const { currentShip, selectedWaypoint, setIsToastVisible, setCurrentShip } =
    useContext(GameContext);
  const [location, setLocation] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(MODAL_TYPE.ships);
  const [waypoints, setWaypoints] = useState(undefined);

  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const closeModal = () => setIsModalOpen(false);
  const { contracts, systems, agent, ships } = useAllQueries(token);

  const shipSymbol = currentShip?.symbol;
  const actionProps = {
    token,
    shipSymbol,
    setIsToastVisible,
    queryClient,
    setCurrentShip,
  };

  const actions = [
    {
      text: 'refuel Ship',
      callBack: refuelShip,
      callBackProps: actionProps,
    },
    {
      text: 'Orbit',
      callBack: orbitShip,
      callBackProps: actionProps,
    },
    {
      text: 'Mine Asteroid',
      callBack: mineAsteroid,
      callBackProps: actionProps,
    },
    {
      text: 'Dock',
      callBack: dockShip,
    },
  ];

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
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex w-full items-stretch justify-between space-x-4'>
            <AgentDetails agent={agent} />
            <ShipDetails ship={currentShip} />
          </div>
          <ActionRow
            style='rounded-md border-2 border-map-green w-full'
            actions={actions}
          />
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
        currentShip={currentShip}
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
