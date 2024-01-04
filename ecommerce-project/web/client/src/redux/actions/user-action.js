import { createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { userService } from 'src/services/user-service';

const defaultMessage = {
  message: null,
};

const loginUser = createAsyncThunk('USER_LOGIN_USER', async (p) => {
  const { status, data } = await userService.loginUser(p);
  if (status < 400) {
    if (data) {
      const decodedToken = jwtDecode(data.data);
      return {
        message: data.message,
        success: data.success,
        data: decodedToken,
      };
    }
  }
  return data;
});

const getInfoUser = createAsyncThunk('USER_GET_INFO_USER', async (p) => {
  const { data } = await userService.getInfoUser(p);
  return data;
});

const logoutUser = createAsyncThunk('USER_LOGOUT_USER', async () => {
  const { data } = await userService.LogoutUser();
  return data;
});

const updateUser = createAsyncThunk('USER_UPDATE_USER', async (p) => {
  const { data } = await userService.updateUser(p);
  return data;
});

const registerUser = createAsyncThunk('USER_REGISTER_USER', async (p) => {
  const { data } = await userService.registerUser(p);
  return data;
});

const cleanMessage = createAsyncThunk('USER_CLEAN_MESSAGE_USER', () => defaultMessage);

export const UserActionThunk = {
  loginUser,
  getInfoUser,
  logoutUser,
  updateUser,
  cleanMessage,
  registerUser,
};
