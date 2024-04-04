import React from 'react';
import './Results.scss';
import { Box, Button } from '@mui/material';
import DetailsModal from '../DetailsModal/DetailsModal';
import { strings } from '../../utils/en-us';
import { IProduct } from '../../utils/models';

interface IResults {
  product: IProduct;
  key: number;
}

const Results: React.FC<IResults> = ({ product }) => {
  const [openDetails, setOpenDetails] = React.useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          backgroundColor: product.color,
        }}
        className='flex-column-box result-row'
      >
        <div className='result-row__content'>
          <span className='result-row__id'>ID: {product.id}</span>
          <Button
            sx={{ color: 'white' }}
            onClick={() => setOpenDetails((prev) => !prev)}
          >
            <span>
              {product.name} ({strings.year} {product.year})
            </span>
          </Button>
        </div>
      </Box>
      <DetailsModal
        isOpen={openDetails}
        close={() => setOpenDetails((prev) => !prev)}
      />
    </>
  );
};

export default Results;
