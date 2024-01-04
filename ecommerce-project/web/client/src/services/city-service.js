import axios from 'axios';

const URL = 'https://api-crownx.winmart.vn/mt/api/web/v1/';
export const cityService = {
  getAllProvinces: async () => {
    const resp = await axios({
      method: 'get',
      url: `${URL}provinces/all-winmart`,
      headers: 'application/json',
      data: null,
    });
    return resp.data;
  },
  getAllDistricts: async (p) => {
    const resp = await axios({
      method: 'get',
      url: `${URL}districts/all-winmart?provinceCode=${p.code}`,
      headers: 'application/json',
      data: null,
    });
    return resp.data;
  },
  getAllWards: async (p) => {
    const resp = await axios({
      method: 'get',
      url: `${URL}wards/all-winmart?provinceCode=${p.provinceCode}&districtCode=${p.districtCode}`,
      headers: 'application/json',
      data: null,
    });
    return resp.data;
  },
};
