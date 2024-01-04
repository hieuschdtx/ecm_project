import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';

const URI = 'v1/order/';
export const orderService = {
  createOrder: async (p) => await callApi(`${URI}create`, METHOS_TYPE.post, HEADER_TYPES.json, p),
};
