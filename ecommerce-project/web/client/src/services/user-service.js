import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';

const URI = 'v1/user/';
export const userService = {
  loginUser: async (p) => await callApi(`${URI}login`, METHOS_TYPE.post, HEADER_TYPES.json, p),
  getInfoUser: async (p) => await callApi(`${URI}profile?id=${p.id}`, METHOS_TYPE.get, HEADER_TYPES.json, null),
  LogoutUser: async () => await callApi(`${URI}logout`, METHOS_TYPE.post, HEADER_TYPES.json, null),
  updateUser: async (p) => await callApi(`${URI}update?id=${p.get('id')}`, METHOS_TYPE.put, HEADER_TYPES.multipart, p),

  checkEmailExisted: async (p) => await callApi(`${URI}email`, METHOS_TYPE.post, HEADER_TYPES.json, p),
  checkVerifyCode: async (p) => await callApi(`${URI}check-verify`, METHOS_TYPE.post, HEADER_TYPES.json, p),
  updatePassword: async (p) => await callApi(`${URI}update-password`, METHOS_TYPE.put, HEADER_TYPES.json, p),
  registerUser: async (p) => await callApi(`${URI}register`, METHOS_TYPE.post, HEADER_TYPES.json, p),
};
