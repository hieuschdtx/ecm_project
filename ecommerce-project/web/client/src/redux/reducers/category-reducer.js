import { createSlice } from '@reduxjs/toolkit';
import { categoryActionThunk } from '../actions/category-action';

const { getAllCategories } = categoryActionThunk;

const categorySilce = createSlice({
  name: 'CATEGORY',
  initialState: {
    categories: [],
    loading: false,
    message: '',
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetAllCategories
      .addCase(getAllCategories.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllCategories.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        categories: action.payload,
      }))
      .addCase(getAllCategories.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
        message: action.error?.message,
      }));
  },
});

export default categorySilce.reducer;
