import { Box } from '@material-ui/core';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import productApi from '../../../api/productApi';
import { addToCart } from '../../Cart/cartSlice';

const Loading = lazy(() => import('../components/Loading'));
const Product = lazy(() => import('../components/Product'));

function ProductDetailPage() {
  const { params } = useRouteMatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [counterProduct, setCounterProduct] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const data = await productApi.getById(params.productId);
        setProduct(data);
      } catch (error) {
        console.log(`Failed to fetch a product detail: ${error} `);
      }

      setLoading(false);
    })();
  }, [params.productId]);

  const handleAddToCart = (product) => {
    const action = addToCart(product);
    dispatch(action);
  };

  const handleIncreaseCounterProduct = () => {
    setCounterProduct((prevState) => prevState + 1);
  };

  const handleDecreaseCounterProduct = () => {
    setCounterProduct((prevState) => prevState - 1);
  };

  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        {loading && <Loading />}
        {product && (
          <Product
            product={product}
            addToCart={handleAddToCart}
            increaseProduct={handleIncreaseCounterProduct}
            decreaseProduct={handleDecreaseCounterProduct}
            productQuantity={counterProduct}
          />
        )}
      </Suspense>
    </Box>
  );
}

export default ProductDetailPage;
