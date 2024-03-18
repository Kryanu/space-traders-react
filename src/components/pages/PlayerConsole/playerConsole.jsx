import { Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AgentDetails, NavigationButtons, MapSelector } from './children';
import NavBar from '../../Layouts/navbar';
import { GameContext } from '../../../context/';
import { Modal } from '../../organisms';
import ShipViewer from '../ShipViewer/ShipViewer';
import Waypoints from '../Waypoint/Waypoint';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toToken } from '../../../api/adapters';
import {
  setLocationDetails,
  retrieveAgent,
  retrieveSystemsConfig,
} from './logic';
import { retrieveMapWaypoints } from '../../../hooks/helpers';

export default function PlayerConsole() {
  const { currentShip, selectedWaypoint } = useContext(GameContext);
  const [location, setLocation] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waypoints, setWaypoints] = useState(undefined);
  const queryClient = useQueryClient();
  const token = toToken(queryClient);
  const closeModal = () => setIsModalOpen(false);
  const systems = useQuery(retrieveSystemsConfig).data;
  const agent = useQuery({
    queryKey: ['agent'],
    queryFn: async () => {
      return await retrieveAgent(token);
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
      <div className='flex flex-col mb-auto pb-2'>
        <NavBar route={'/'} />
        <div className='flex space-x-2'>
          <div className='flex flex-col'>
            <Typography color={'#32C832'} variant='h5'>
              Agent Details:
            </Typography>
            <AgentDetails agent={agent} />
          </div>
        </div>
        <NavigationButtons openModal={setIsModalOpen} />
        <Waypoints
          waypointSymbol={selectedWaypoint.symbol}
          location={location}
        />
      </div>
      <MapSelector systems={systems} waypoints={waypoints} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='bg-blackie p-4 rounded-lg border-2 border-map-green'>
          <Typography variant='h3'>Select a Ship</Typography>
          <ShipViewer closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
}
