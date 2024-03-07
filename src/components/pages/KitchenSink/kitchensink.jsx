import React, { useState, useContext } from 'react';
import { GameContext } from '../../../context';
import { Toast } from '../../molecules/Toast/Toast';

const KitchenSink = () => {
  const { isToastVisible, setIsToastVisible } = useContext(GameContext);
  return (
    <div>
      <button
        onClick={() => {
          setIsToastVisible(true);
        }}
      >
        Show Toast
      </button>
      <Toast message='This is a toast message' isVisible={isToastVisible} />
    </div>
  );
};

export default KitchenSink;
