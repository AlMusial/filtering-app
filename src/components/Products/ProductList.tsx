import React from 'react';
import './ProductList.scss';
import { useFetch } from '../hooks/useFetch';
import { GET_PRODUCTS, ITEM_PER_PAGE } from '../../utils/consts';
import { NumericFormat } from 'react-number-format';
import {
  Alert,
  CircularProgress,
  Pagination,
  PaginationItem,
} from '@mui/material';
import Results from '../Results/Results';
import { IProduct } from '../../utils/models';
import SearchIcon from '@mui/icons-material/Search';

import { Link } from 'react-router-dom';
import { strings } from '../../utils/en-us';

export const ProductList: React.FC = () => {
  const { data, loading, error, totalCount, fetchData } = useFetch(
    `${GET_PRODUCTS}?page=1`
  );
  const [filteredValue, setFilteredValue] = React.useState<string>();
  const [currentPage, _setCurrentPage] = React.useState<number>(1);
  //const location = useLocation();
  const query = new URLSearchParams(window.location.search);
  const page = parseInt(query.get('page') || '1', 10);

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log('fetched data:', data, query);
  }

  React.useEffect(() => {
    if (filteredValue != null && filteredValue?.length > 0) {
      const getData = setTimeout(() => {
        fetchData(`${GET_PRODUCTS}?page=${currentPage}?&id=${filteredValue}`);
      }, 400);
      return () => clearTimeout(getData);
    }
  }, [filteredValue]);

  const onFilterProducts = (event: any) => {
    console.log('e:', event, event.target.value);
    setFilteredValue(event.target.value);
  };

  const checkIfServerErrorRange = (code: number) => {
    return code >= 500;
  };

  return (
    <div className='productList flex-column-box'>
      <div className='productList__search'>
        <NumericFormat
          className='productList__filter w-100'
          type='text'
          value={filteredValue}
          allowLeadingZeros={false}
          allowedDecimalSeparators={[',', '.']}
          onChange={(e) => onFilterProducts(e)}
          //decimalScale={0}
          //onChange={onChange}
        />
        <SearchIcon />
      </div>
      <div className='flex-column-box w-100 margin-base-top'>
        {loading ? (
          <CircularProgress />
        ) : (
          data != null &&
          error === null &&
          (Array.isArray(data.data) ? (
            data.data
              .slice(0, ITEM_PER_PAGE)
              .map((row: IProduct, index: number) => (
                <Results key={index} product={row} />
              ))
          ) : (
            <Results key={100} product={data.data} />
          ))
        )}
      </div>
      {error && (
        <div className='alert margin-base-top'>
          <Alert severity='error'>
            {
              strings.errors[
                checkIfServerErrorRange(error.request.status)
                  ? 'serverError'
                  : 'forbiddenError'
              ]
            }
          </Alert>
        </div>
      )}
      <Pagination
        page={page}
        count={Math.ceil(totalCount / ITEM_PER_PAGE)}
        sx={{ display: 'flex', justifyContent: 'center' }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/?page=${item.page}`}
            {...item}
          />
        )}
      />
    </div>
  );
};
