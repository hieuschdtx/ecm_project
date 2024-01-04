import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';

const URI = 'v1/product-category/';
export const productCategoryService = {
  getProductCategoryByCategoryId: async (id) =>
    await callApi(`${URI}category?id=${id}`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
