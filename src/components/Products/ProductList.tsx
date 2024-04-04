import React from 'react';
import './ProductList.scss';
import { useFetch } from '../hooks/useFetch';
import { GET_PRODUCTS } from '../../utils/consts';
import { NumericFormat } from 'react-number-format';
import { Alert, CircularProgress } from '@mui/material';
import Results from '../Results/Results';
import { IProduct } from '../../utils/models';
import SearchIcon from '@mui/icons-material/Search';
//const Controlled = ControlledNumericField<any>();

const ProductList: React.FC = () => {
  const { data, loading, error } = useFetch(GET_PRODUCTS);

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log('fetched data:', data);
  }

  return (
    <div className='productList flex-column-box'>
      <div className='productList__search'>
        <NumericFormat
          className='productList__filter w-100'
          type='text'
          value={'123'}
          allowLeadingZeros
          thousandSeparator=' '
          //decimalSeparator=','
          allowedDecimalSeparators={[',', '.']}
          //decimalScale={0}
          //onChange={onChange}
        />
        <SearchIcon />
      </div>
      <div className='flex-column-box w-100 margin-base-top'>
        {loading ? (
          <CircularProgress />
        ) : (
          data &&
          data.data.map((row: IProduct, index: number) => (
            <Results key={index} product={row} />
          ))
        )}
      </div>
      {error && (
        <div className='alert margin-base-top'>
          <Alert severity='error'>{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default ProductList;
