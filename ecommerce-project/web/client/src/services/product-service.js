import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';
import { stringify } from 'query-string';
const URI = 'v1/product/';
export const productService = {
  getProductByProductCategory: async () =>
    await callApi(`${URI}product-category`, METHOS_TYPE.get, HEADER_TYPES.json, null),
  getAllProduct: async () => await callApi(`${URI}get-all`, METHOS_TYPE.get, HEADER_TYPES.json, null),
  getAllProductPaging: async (p) =>
    await callApi(`${URI}paging?${stringify(p)}`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
