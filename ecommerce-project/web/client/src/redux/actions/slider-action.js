import { createAsyncThunk } from '@reduxjs/toolkit';
import { sliderService } from 'src/services/slider-service';

const getAllSildes = createAsyncThunk('SLIDES_GET_ALL_SLIDES', async () => {
  const { data } = await sliderService.getAllSlider();
  return data;
});

export const slideActionThunk = {
  getAllSildes,
};
