import { createSlice } from '@reduxjs/toolkit';
import { newsActionThunk } from '../actions/news-action';

const { getAllNewsPaging, getAllNews } = newsActionThunk;
const apiState = { loading: false, success: false, result: [] };
const newsSlice = createSlice({
  name: 'NEWS',
  initialState: {
    news: [],
    loading: false,
    success: false,
    filterPaging: { ...apiState },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNewsPaging.pending, (state) => ({
        ...state,
        filterPaging: { ...apiState, loading: true },
      }))
      .addCase(getAllNewsPaging.fulfilled, (state, action) => {
        const { has_previous, has_next, current_page, page_size, total_count, total_pages, items } = action.payload;
        return {
          ...state,
          filterPaging: {
            ...apiState,
            loading: true,
            result: items,
            has_previous,
            has_next,
            current_page,
            page_size,
            total_count,
            total_pages,
            success: true,
          },
        };
      })
      .addCase(getAllNews.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllNews.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        news: action.payload,
      }));
  },
});

export default newsSlice.reducer;
