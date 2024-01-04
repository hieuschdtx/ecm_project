import { createAsyncThunk } from '@reduxjs/toolkit';
import { productCategoryService } from 'src/services/product-category-service';

const getProductCategoryByCategoryId = createAsyncThunk(
  'PRODUCTCATEGORIES_GET_BY_CATEGORY_ID_PRODUCTCATEGORIES',
  async (id) => {
    const { data } = await productCategoryService.getProductCategoryByCategoryId(id);
    return data;
  }
);

export const productCategoryActionThunk = {
  getProductCategoryByCategoryId,
};
