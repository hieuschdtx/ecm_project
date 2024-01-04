import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from 'src/services/product-service';
import { responseHeaders } from 'src/utils/const';

const getProductByProductCategory = createAsyncThunk('PRODUCTS_GET_BY_PRODUCT_CATEORY_PRODUCTS', async () => {
  const { data } = await productService.getProductByProductCategory();
  return data;
});
const getAllProduct = createAsyncThunk('PRODUCT_GET_ALL_PRODUCTS', async () => {
  const { data } = await productService.getAllProduct();
  return data;
});

const getAllProductPaging = createAsyncThunk('PRODUCT_GET_ALL_PAGING_PRODUCT', async (p) => {
  const response = await productService.getAllProductPaging(p);
  const dataPanigation = JSON.parse(response.headers[responseHeaders.panigation]);
  return { items: response.data, ...dataPanigation };
});

export const productAsyncThunk = {
  getProductByProductCategory,
  getAllProduct,
  getAllProductPaging,
};
