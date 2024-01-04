import { createSlice } from '@reduxjs/toolkit';
import { cityActionThunk } from '../actions/city-action';

const { getAllProvinces, getAllDistricts, getAllWards, selectAddress } = cityActionThunk;

const citySlice = createSlice({
  name: 'CITY',
  initialState: {
    provinces: [],
    districts: [],
    wards: [],
    userAddress: {},
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProvinces.pending, (state) => ({ ...state, loading: true, success: false }))
      .addCase(getAllProvinces.fulfilled, (state, action) => ({
        ...state,
        provinces: action.payload,
        loading: false,
        success: true,
      }))
      .addCase(getAllProvinces.rejected, (state) => ({
        ...state,
        loading: false,
        success: false,
      }))
      .addCase(getAllDistricts.pending, (state) => ({
        ...state,
        success: false,
        loading: true,
      }))
      .addCase(getAllDistricts.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        districts: action.payload,
      }))
      .addCase(getAllDistricts.rejected, (state) => ({
        ...state,
        loading: false,
        success: false,
      }))
      .addCase(getAllWards.pending, (state) => ({
        ...state,
        success: false,
        loading: true,
      }))
      .addCase(getAllWards.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        wards: action.payload,
      }))
      .addCase(getAllWards.rejected, (state) => ({
        ...state,
        loading: false,
        success: false,
      }))
      .addCase(selectAddress.pending, (state) => ({
        ...state,
        loading: true,
        success: false,
      }))
      .addCase(selectAddress.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        userAddress: action.payload,
      }))
      .addCase(selectAddress.rejected, (state) => ({
        ...state,
        loading: false,
        success: false,
      }));
  },
});

export default citySlice.reducer;
