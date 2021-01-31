import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import productApi from '../../../api/productApi';

const Loading = lazy(() => import('../components/Loading'));
const ProductPagination = lazy(() => import('../components/Pagination'));
const ProductList = lazy(() => import('../components/ProductList'));

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
  const [isDescending, setIsDescending] = useState(true);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 8,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 8,
    _page: 1,
    _sort: 'createdAt',
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

  const handleEditClick = (product) => {
    console.log(`Product to be edit ${product}`);
  };

  const handleRemoveClick = async (product) => {
    try {
      const message = `Are you sure to remove product named "${product.name}"? 😭`;
      if (window.confirm(message)) {
        await productApi.remove(product.id);
        setFilters((x) => ({ ...x }));
      }
    } catch (error) {
      console.log('Failed to remove product: ', error);
    }
  };

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);

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
      <Suspense fallback={<div>Loading...</div>}>
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
              onEdit={handleEditClick}
              onRemove={handleRemoveClick}
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
      </Suspense>
    </Box>
  );
}

export default ProductListPage;
