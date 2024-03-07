import { useContext, useEffect, useState } from 'react';
import { retrieveAsteroids, orbitShip } from './astroidMining_logic';
import { DisplayAsteroids } from './astroidMining_children';
import { NavBar } from '../../Layouts';
import Countdown from '../../atoms/Countdown';
import { TokenContext, GameContext } from '../../../context';
import { Toast } from '../../molecules/Toast/Toast';
export default function AstroidMining() {
  const { token } = useContext(TokenContext);
  const { location, ships, isToastVisible, setIsToastVisible } =
    useContext(GameContext);
  const [asteroids, setAsteroids] = useState(undefined);
  const [time, setTime] = useState(0);
  const renderCount = () => {
    if (time !== 0) {
      return <Countdown arrival={time} />;
    }
  };

  useEffect(() => {
    if (token && location?.system && ships) {
      orbitShip({ token, shipSymbol: ships.symbol });
      retrieveAsteroids(token, location.system, setAsteroids);
    }
  }, []);
  return (
    <div className='flex flex-col'>
      <NavBar route={'/console'} />
      {DisplayAsteroids(
        asteroids,
        token,
        ships.symbol,
        setTime,
        setIsToastVisible
      )}
      {renderCount(time)}
      <Toast
        message={isToastVisible.message}
        isVisible={isToastVisible.isVisible}
      />
    </div>
  );
}
