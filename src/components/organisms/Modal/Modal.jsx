import { Button } from '@mui/material';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return <></>;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-overlay-gray'>
      <div className='flex flex-col items-center space-y-2 p-5 rounded-md '>
        <Button size='large' onClick={onClose}>
          Close
        </Button>
        {children}
      </div>
    </div>
  );
}
