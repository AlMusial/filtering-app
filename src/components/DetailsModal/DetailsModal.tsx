import { Modal } from '@mui/material';
import React from 'react';
import { strings } from '../../utils/en-us';

interface IDetailsModal {
  isOpen: boolean;
  close: () => void;
}

const DetailsModal: React.FC<IDetailsModal> = ({ isOpen, close }) => {
  return (
    <Modal open={isOpen} onClose={close}>
      <div>{strings.product}</div>
    </Modal>
  );
};

export default DetailsModal;
