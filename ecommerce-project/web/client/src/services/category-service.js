import { callApi, HEADER_TYPES, METHOS_TYPE } from 'src/utils/axios-instance';

const URI = 'v1/category/';
export const CategoryService = {
  getAllCategories: async () =>
    await callApi(`${URI}get-all`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
