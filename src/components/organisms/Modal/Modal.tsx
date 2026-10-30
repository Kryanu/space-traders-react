import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return <></>;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-overlay-gray'>
      <div className='flex flex-col items-center space-y-2 p-5 rounded-md '>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
