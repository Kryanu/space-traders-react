import React, { useState } from 'react';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return <></>;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-overlay-gray'>
      <div className='p-5 rounded-md'>
        <button
          className='absolute top-3 right-3 bg-none border-none cursor-pointer'
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='p-4 rounded-md bg-blackie'>
          <h2>This is a modal</h2>
          <p>Modal content goes here...</p>
        </div>
      </Modal>
    </div>
  );
};

export default App;
