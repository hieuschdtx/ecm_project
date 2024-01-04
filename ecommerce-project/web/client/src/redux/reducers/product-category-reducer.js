import { createSlice } from '@reduxjs/toolkit';
import { productCategoryActionThunk } from '../actions/product-category-action';

const { getProductCategoryByCategoryId } = productCategoryActionThunk;

const productCategorySilce = createSlice({
  name: 'PRODUCT_CATEGORY',
  initialState: {
    productCategories: [],
    loading: false,
    message: '',
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategoryByCategoryId.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getProductCategoryByCategoryId.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        productCategories: action.payload,
      }))
      .addCase(getProductCategoryByCategoryId.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
        message: action.error?.message,
      }));
  },
});

export default productCategorySilce.reducer;
