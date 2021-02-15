import { Container } from '@material-ui/core';
import React, { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { addNewFromCart, removeAllFromCart, removeFromCart } from './cartSlice';

const CartList = lazy(() => import('./components/CartList'));

function CartFeature() {
  const dispatch = useDispatch();

  const handleDecreaseItem = (product) => {
    const action = removeFromCart(product);
    dispatch(action);
  };

  const handleIncreaseItem = (product) => {
    const action = addNewFromCart(product);
    dispatch(action);
  };

  const handleRemoveAllFromCart = (product) => {
    const action = removeAllFromCart(product);
    dispatch(action);
  };

  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <CartList
          onDecreaseItem={handleDecreaseItem}
          onIncreaseItem={handleIncreaseItem}
          onRemoveAllFromCart={handleRemoveAllFromCart}
        />
      </Suspense>
    </Container>
  );
}

export default CartFeature;
