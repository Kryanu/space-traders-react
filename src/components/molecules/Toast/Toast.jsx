import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../../context';
import './Toast.css'; // Import CSS for styling

export const Toast = ({ message, isVisible }) => {
  const { setIsToastVisible } = useContext(GameContext);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsToastVisible({ isVisible: false, message: '' });
      }, 3000); // Hides the toast after 3 seconds
    }
  }, [isVisible]);

  if (!isVisible) {
    return <></>;
  }

  return (
    <div className={`toast show `}>
      <div className='toast-message'>{message}</div>
    </div>
  );
};
