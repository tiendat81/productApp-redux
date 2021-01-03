import productReducer from '../features/Product/productSlice';
import cartReducer from '../features/Cart/cartSlice';

const rootReducer = {
  products: productReducer,
  cart: cartReducer,
};

export default rootReducer;
