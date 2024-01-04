import { createSlice } from '@reduxjs/toolkit';
import { UserActionThunk } from '../actions/user-action';

const { loginUser, getInfoUser, logoutUser, updateUser, cleanMessage, registerUser } = UserActionThunk;

const userSlice = createSlice({
  name: 'USER',
  initialState: {
    user: null,
    loading: false,
    message: null,
    success: false,
    error: false,
    refresh: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data, message, success } = action.payload;
        return {
          ...state,
          loading: false,
          message,
          user: data,
          success,
        };
      })
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
        message: action.error?.message,
        success: false,
      }))
      .addCase(getInfoUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getInfoUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        error: false,
        user: { ...state.user, ...action.payload },
      }))
      .addCase(getInfoUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
        message: action.error?.message,
        success: false,
      }))
      .addCase(logoutUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(logoutUser.fulfilled, (state) => ({
        ...state,
        loading: false,
        message: null,
        success: false,
        error: false,
        user: null,
      }))
      .addCase(logoutUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        message: action.error?.message,
        error: true,
        success: false,
      }))
      .addCase(updateUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateUser.fulfilled, (state, action) => {
        const { message, success } = action.payload;
        return {
          ...state,
          loading: false,
          message,
          success,
          error: false,
          refresh: true,
        };
      })
      .addCase(updateUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        message: action.error?.message,
        success: false,
        error: true,
      }))
      .addCase(cleanMessage.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        message: action.payload.message,
        success: false,
        error: false,
        refresh: false,
      }))
      .addCase(registerUser.pending, (state) => ({
        ...state,
        loading: true,
        success: false,
        error: false,
        refresh: false,
      }))
      .addCase(registerUser.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: action.payload?.success,
        error: false,
        refresh: false,
        message: action.payload?.message,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        success: action.payload?.success,
        error: true,
        refresh: false,
        message: action.error?.message,
      }));
  },
});

export default userSlice.reducer;
