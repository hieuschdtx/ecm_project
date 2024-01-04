import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryService } from 'src/services/category-service';

const getAllCategories = createAsyncThunk('CATEGORIES_GET_CATEGORIES', async () => {
  const { data } = await CategoryService.getAllCategories();
  return data;
});

export const categoryActionThunk = {
  getAllCategories,
};
