import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from 'api/productApi';

export const getProductList = createAsyncThunk('products/getProductList', async (payload) => {
  const response = await productApi.getAll(payload);
  return response;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: {
    [getProductList.fulfilled]: (state, action) => {
      state.list = action.payload.data || [];
    },
  },
});

const { reducer } = productSlice;
export default reducer;
