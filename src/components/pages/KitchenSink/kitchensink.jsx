import React, { useContext } from 'react';
import { GameContext } from '../../../context';

const KitchenSink = () => {
  const { setIsToastVisible } = useContext(GameContext);
  return (
    <div>
      <button
        onClick={() => {
          setIsToastVisible({ isVisible: true, message: 'Hello' });
        }}
      >
        Show Toast
      </button>
    </div>
  );
};

export default KitchenSink;
