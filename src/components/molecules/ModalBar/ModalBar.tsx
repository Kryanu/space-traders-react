import { MODAL_TYPE } from '../../../constants';
import { Button } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type ModalType = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

interface NavigationButtonsProps {
  openModal: (open: boolean) => void;
  setModalType: Dispatch<SetStateAction<ModalType>>;
}

export default function NavigationButtons(props: NavigationButtonsProps) {
  const { openModal, setModalType } = props;

  const modalConfig = [
    {
      label: 'Select Ship',
      action: () => {
        openModal(true);
        setModalType(MODAL_TYPE.ships);
      },
    },
    {
      label: 'View Contracts',
      action: () => {
        openModal(true);
        setModalType(MODAL_TYPE.contracts);
      },
    },
  ];

  const modalButtons = modalConfig.map((item, index) => {
    return (
      <Button
        key={index}
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0.75rem',
        }}
        onClick={() => item.action()}
      >
        {item.label}
      </Button>
    );
  });

  return (
    <div className='flex pb-2 border-b-2 border-map-green'>{modalButtons}</div>
  );
}
