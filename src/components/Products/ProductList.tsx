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
import { Link, useLocation } from 'react-router-dom';
import { strings } from '../../utils/en-us';
import { useSearchParams } from 'react-router-dom';

export const ProductList: React.FC = () => {
  const location = useLocation();
  const { data, loading, error, totalCount, fetchData } = useFetch(
    `${GET_PRODUCTS}${location.search}`
  );
  const query = new URLSearchParams(window.location.search);
  const page =
    query.get('page') != null ? parseInt(query.get('page') || '1') : null;
  const [filteredValue, setFilteredValue] = React.useState<string>();
  const [currentPage, setCurrentPage] = React.useState<number | null>(page);
  const [, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (filteredValue != null && filteredValue.length > 0) {
      const getData = setTimeout(() => {
        fetchData(`${GET_PRODUCTS}?&id=${filteredValue}`);
      }, 500);
      return () => clearTimeout(getData);
    } else if (currentPage != null) {
      const getData = setTimeout(() => {
        fetchData(`${GET_PRODUCTS}?page=${currentPage}`);
      }, 100);
      return () => clearTimeout(getData);
    }
  }, [filteredValue, currentPage]);

  const onFilterProducts = (event: any) => {
    setSearchParams(
      `?${new URLSearchParams({
        page: currentPage != null ? currentPage.toString() : '1',
        ...(event.target.value.length > 0 && { id: event.target.value }),
      })}`
    );
    setFilteredValue(event.target.value);
  };

  const checkIfServerErrorRange = (code: number) => {
    return code >= 500;
  };

  const onChangePage = (_e: any, page: number) => {
    setSearchParams(
      `?${new URLSearchParams({
        page: page.toString(),
      })}`
    );
    setFilteredValue('');
    setCurrentPage(page);
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
        defaultPage={page || 1}
        count={Math.ceil(totalCount / ITEM_PER_PAGE)}
        sx={{ display: 'flex', justifyContent: 'center' }}
        onChange={onChangePage}
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
