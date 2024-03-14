export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return <></>;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-overlay-gray'>
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
