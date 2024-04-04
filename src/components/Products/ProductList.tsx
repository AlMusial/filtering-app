import React from 'react';
import './ProductList.scss';
import { useFetch } from '../hooks/useFetch';
import { GET_PRODUCTS } from '../../utils/consts';
import { NumericFormat } from 'react-number-format';
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
    </div>
  );
};

export default ProductList;
