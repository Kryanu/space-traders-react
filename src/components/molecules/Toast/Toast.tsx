import { useEffect } from 'react';
import { useGameContext } from '../../../context';
import './Toast.css'; // Import CSS for styling

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast = ({ message, isVisible }: ToastProps) => {
  const { setIsToastVisible } = useGameContext();

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
