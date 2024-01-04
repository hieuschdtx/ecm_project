import { stringify } from 'query-string';
import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';
const URI = 'v1/news';
export const newsService = {
  getAllNewsPaging: async (p) =>
    await callApi(`${URI}/paging?${stringify(p)}`, METHOS_TYPE.get, HEADER_TYPES.json, null),
  getAllNews: async () => await callApi(`${URI}`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
