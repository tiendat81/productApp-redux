import { createSelector } from '@reduxjs/toolkit';

export const cartItemSelector = (state) => state.cart.cartItems;

export const itemCountSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((count, item) => count + item.quantity, 0)
);

export const totalSelector = createSelector(cartItemSelector, (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
);
