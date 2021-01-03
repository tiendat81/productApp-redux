import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import Loading from '../components/Loading';
import ProductPagination from '../components/Pagination';
import ProductList from '../components/ProductList';

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function ProductListPage() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 8,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 8,
    _page: 1,
    _sort: 'updatedAt',
    _order: 'desc',
  });

  const { _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      _page: newPage,
    });
  };

  const handleSortDescending = async () => {
    setFilters({
      ...filters,
      _order: 'desc',
    });
    setIsDescending(true);
    setIsAscending(false);
  };

  const handleSortAscending = () => {
    setFilters({
      ...filters,
      _order: 'asc',
    });
    setIsDescending(false);
    setIsAscending(true);
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        console.log(data);

        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(`Failed to fetch product list: ${error}`);
      }

      setLoading(false);
    })();
  }, [filters]);

  return (
    <Box>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <ProductList
            productList={productList}
            onPageChange={handlePageChange}
            sortAscending={handleSortAscending}
            sortDescending={handleSortDescending}
            isAscending={isAscending}
            isDescending={isDescending}
          />

          <Container className={classes.pagination}>
            <ProductPagination
              count={totalPages}
              page={pagination._page}
              onPageChange={handlePageChange}
            />
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default ProductListPage;
