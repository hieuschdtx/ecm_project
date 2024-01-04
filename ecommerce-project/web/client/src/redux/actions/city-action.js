import { createAsyncThunk } from '@reduxjs/toolkit';
import { cityService } from 'src/services/city-service';

const getAllProvinces = createAsyncThunk('CITY_GET_PROVINCES_CITY', async () => {
  const { data } = await cityService.getAllProvinces();
  return data;
});

const getAllDistricts = createAsyncThunk('CITY_GET_DISTRICTS_CITY', async (p) => {
  const { data } = await cityService.getAllDistricts(p);
  return data;
});

const getAllWards = createAsyncThunk('CITY_GET_WARDS_CITY', async (p) => {
  const { data } = await cityService.getAllWards(p);
  return data;
});

const selectAddress = createAsyncThunk('CITY_SELECT_ADDRESS_CITY', async (p) => {
  return p;
});

export const cityActionThunk = {
  getAllProvinces,
  getAllDistricts,
  getAllWards,
  selectAddress,
};
