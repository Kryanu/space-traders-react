import { MODAL_TYPE } from '../../../constants';
import { useContext, useEffect, useState } from 'react';
import { ModalSelector } from './children';
import NavBar from '../../Layouts/navbar';
import { GameContext } from '../../../context/';
import { Modal, MapSelector } from '../../organisms';
import { AgentDetails, ModalBar } from '../../molecules';
import { Waypoints } from '../index';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import { API } from '../../../api/service';
import {
  setLocationDetails,
  retrieveAgent,
  retrieveSystemsConfig,
} from './logic';
import { retrieveMapWaypoints } from '../../../hooks/helpers';
import { Ship } from '../ShipViewer/ShipViewer_children';

export default function PlayerConsole() {
  const { currentShip, selectedWaypoint } = useContext(GameContext);
  const [location, setLocation] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waypoints, setWaypoints] = useState(undefined);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const closeModal = () => setIsModalOpen(false);
  const [modalType, setModalType] = useState(MODAL_TYPE.ships);

  const contracts = useQuery({
    queryKey: ['contracts'],
    queryFn: async () => {
      return await API.agent.viewContracts(token);
    },
  }).data;
  const systems = useQuery(retrieveSystemsConfig).data;
  const agent = useQuery({
    queryKey: ['agent'],
    queryFn: async () => {
      return await retrieveAgent(token);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  }).data;
  const ships = useQuery({
    queryKey: ['ships'],
    queryFn: async () => {
      return await API.fleet.getShips(token);
    },
  }).data;

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
          <Ship ship={currentShip} />
        </div>

        <ModalBar openModal={setIsModalOpen} setModalType={setModalType} />
        <Waypoints
          waypointSymbol={selectedWaypoint.symbol}
          location={location}
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
        />
      </Modal>
    </div>
  );
}
