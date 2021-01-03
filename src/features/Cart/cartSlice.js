import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      // action.payload = { product, quantity }
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);
      if (idx < 0) {
        // not existed in cart
        state.cartItems.push(newItem);
      } else {
        // existed in cart
        state.cartItems[idx].quantity += newItem.quantity;
      }

      state.totalAmount += newItem.product.originalPrice * newItem.quantity;
    },

    removeFromCart(state, action) {
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);

      if (idx < 0) {
        state.cartItems = state.cartItems;
      } else {
        state.cartItems[idx].quantity -= 1;
        state.totalAmount -= newItem.product.originalPrice;
      }
    },

    addNewFromCart(state, action) {
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);

      if (idx < 0) {
        state.cartItems = state.cartItems;
      } else {
        state.cartItems[idx].quantity += 1;
        state.totalAmount += newItem.product.originalPrice;
      }
    },

    removeAllFromCart(state, action) {
      const idx = state.cartItems.findIndex((x) => x.product.id === action.payload.product.id);
      if (idx < 0) {
        state.cartItems = state.cartItems;
      } else {
        state.cartItems.splice(idx, 1);
        state.totalAmount -= action.payload.product.originalPrice * action.payload.quantity;
      }
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addToCart, removeAllFromCart, removeFromCart, clearCart, addNewFromCart } = actions;
export default reducer;
