import { Box, Container, Tooltip } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import productApi from '../../../api/productApi';
import AlertDialog from '../components/AlertDialog';
import SearchForm from '../components/SeachForm';

const Loading = lazy(() => import('../components/Loading'));
const ProductPagination = lazy(() => import('../components/Pagination'));
const ProductList = lazy(() => import('../components/ProductList'));

function ProductListPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 8,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 8,
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
    // history.push(
    //   `/products/_page=${newPage}&_limit=${filters._limit}&_sort=${filters._sort}&_order=${filters._order}`
    // );
    // history.push(`/products/?_page=${newPage}`);
  };

  const handleEditClick = (product) => {
    console.log(`Product to be edit ${product}`);
  };

  const handleRemoveClick = async (product) => {
    setOpen(true);
    try {
      // const message = `Are you sure to remove product named "${product.name}"? 😭`;
      // if (window.confirm(message)) {
      //   // await productApi.remove(product.id);
      //   setFilters((x) => ({ ...x }));
      // }
    } catch (error) {
      console.log('Failed to remove product: ', error);
    }
  };

  const handleSearch = () => {};

  const handleAddClick = () => {
    history.push({
      pathname: '/products/addEditProduct',
      state: { addMode: true },
    });
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
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        {loading ? (
          <Loading />
        ) : (
          <Box>
            <Container>
              <SearchForm onSubmit={handleSearch} />
              <Box display="flex" justifyContent="flex-end">
                <Tooltip title="Add a new product" placement="top">
                  {<AddBoxOutlinedIcon fontSize="large" onClick={handleAddClick} />}
                </Tooltip>
              </Box>
            </Container>

            <ProductList
              productList={productList}
              onEdit={handleEditClick}
              onRemove={handleRemoveClick}
            />

            <AlertDialog open={open} />

            <Box display="flex" justifyContent="center">
              <ProductPagination
                totalPages={totalPages}
                currentPage={pagination._page}
                onPageChange={handlePageChange}
              />
            </Box>
          </Box>
        )}
      </Suspense>
    </Container>
  );
}

export default ProductListPage;
