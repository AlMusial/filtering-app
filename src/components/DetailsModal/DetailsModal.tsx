import { Box, IconButton, Modal, Typography } from '@mui/material';
import './DetailsModal.scss';
import React from 'react';
import { strings } from '../../utils/en-us';
import { IProduct } from '../../utils/models';
import CloseIcon from '@mui/icons-material/Close';

interface IDetailsModal {
  isOpen: boolean;
  details: IProduct;
  close: () => void;
}

const modalCustomStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 10,
  border: '1px solid #FCFCFC',
  borderRadius: '16px',
  width: '60vw',
  maxWidth: '500px',
  minHeight: '20vh',
  padding: '0 25px 20px',
  bgcolor: '#FFFFFF',
};

const DetailsModal: React.FC<IDetailsModal> = ({ isOpen, details, close }) => {
  return (
    <Modal open={isOpen} onClose={close}>
      <Box sx={modalCustomStyles}>
        <div className='details__header w-100'>
          <Typography
            sx={{
              marginTop: '20px',
              borderBottom: `1px solid ${details.color}`,
              lineHeight: '0px',
            }}
          >
            <h2>{details.name.toUpperCase()}</h2>
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='flex-row-between'>
          <div className='details__column margin-base-top'>
            <div className='details__row'>
              <span> ID: </span>
              <span>{details.id}</span>
            </div>
            <div className='details__row'>
              <span> Color code: </span>
              <span>{details.color}</span>
            </div>
            <div className='details__row'>
              <span> Pantone value: </span>
              <span>{details.pantone_value}</span>
            </div>
            <div className='details__row'>
              <span> Year: </span>
              <span>{details.year}</span>
            </div>
          </div>
          <div className='details__column'>
            <Box
              className='details__sample'
              sx={{ backgroundColor: details.color }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DetailsModal;
