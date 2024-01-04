import { createSlice } from '@reduxjs/toolkit';
import { slideActionThunk } from '../actions/slider-action';

const { getAllSildes } = slideActionThunk;

const slideSlice = createSlice({
  name: 'SLIDE',
  initialState: {
    slides: [],
    loading: false,
    message: '',
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSildes.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllSildes.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        slides: action.payload,
      }))
      .addCase(getAllSildes.rejected, (state, action) => ({
        ...state,
        loading: false,
        message: action.error?.message,
        error: true,
      }));
  },
});
export default slideSlice.reducer;
