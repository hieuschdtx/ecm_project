import { HEADER_TYPES, METHOS_TYPE, callApi } from 'src/utils/axios-instance';

const URI = 'v1/slide/';
export const sliderService = {
  getAllSlider: async () =>
    await callApi(`${URI}get-all`, METHOS_TYPE.get, HEADER_TYPES.json, null),
};
