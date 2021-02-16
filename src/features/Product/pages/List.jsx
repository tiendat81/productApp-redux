import { Box, Button, ButtonGroup, Container, Tooltip } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import productApi from '../../../api/productApi';

const AlertDialog = lazy(() => import('../components/AlertDialog'));
const SearchForm = lazy(() => import('../components/SeachForm'));
const Loading = lazy(() => import('../components/Loading'));
const ProductPagination = lazy(() => import('../components/Pagination'));
const ProductList = lazy(() => import('../components/ProductList'));

function ProductListPage() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState({
    newest: true,
    priceHighToLow: false,
    priceLowToHigh: false,
  });
  const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);

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
    //   `/products?_page=${newPage}&_limit=${filters._limit}&_sort=${filters._sort}&_order=${filters._order}`
    // );
    // history.push(`/products?_page=${newPage}`);
  };

  const handleEditClick = (product) => {
    console.log(`Product to be edit ${product}`);
  };

  const handleRemoveClick = async (product) => {
    setOpen(true);
    setSelectedProductToDelete(product.id);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleRemoveSubmit = async () => {
    try {
      await productApi.remove(selectedProductToDelete);
      setFilters((x) => ({ ...x }));
      setOpen(false);
    } catch (error) {
      console.log('Failed to remove product: ', error);
    }
  };

  const handleSearch = (searchTerm) => {
    console.log('searchTerm: ', searchTerm);
    setFilters({
      _page: 1,
      _s: searchTerm.search,
    });
    // history.push(`/products/?_page=1&s=${searchTerm.search}`);
  };

  const handleAddClick = () => {
    history.push({
      pathname: '/products/addEditProduct',
      state: { addMode: true },
    });
  };

  const handleSortCreatedAt = () => {
    setFilters({
      ...filters,
      _sort: 'createdAt',
      _order: 'desc',
    });
    setVariant({
      newest: true,
      priceHighToLow: false,
      priceLowToHigh: false,
    });
  };

  const handleSortPriceLowToHigh = () => {
    setFilters({
      ...filters,
      _sort: 'originalPrice',
      _order: 'asc',
    });
    setVariant({
      newest: false,
      priceHighToLow: false,
      priceLowToHigh: true,
    });
    // history.push(
    //   `/products?_page=${filters._page}&_limit=${filters._limit}&_sort=${filters._sort}&_order=${filters._order}`
    // );
  };

  const handleSortPriceHighToLow = () => {
    setFilters({
      ...filters,
      _sort: 'originalPrice',
      _order: 'desc',
    });
    setVariant({
      newest: false,
      priceHighToLow: true,
      priceLowToHigh: false,
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
              <Box display="flex" justifyContent="center" mt={3} mb={3} flexWrap="wrap">
                <Button disabled>Sort by: </Button>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button
                    variant={variant.newest ? 'contained' : 'outlined'}
                    onClick={handleSortCreatedAt}
                  >
                    Newest
                  </Button>
                  <Button
                    variant={variant.priceHighToLow ? 'contained' : 'outlined'}
                    onClick={handleSortPriceHighToLow}
                  >
                    Price: High to low
                  </Button>
                  <Button
                    variant={variant.priceLowToHigh ? 'contained' : 'outlined'}
                    onClick={handleSortPriceLowToHigh}
                  >
                    Price: Low to high
                  </Button>
                </ButtonGroup>
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

            <AlertDialog open={open} onAccept={handleRemoveSubmit} onClose={handleCloseDialog} />

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
