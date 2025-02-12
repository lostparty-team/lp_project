import { AxiosResponse } from 'axios';
import { axiosPythonInstance } from '@/api/axios';
import { API } from '@/constants/route';

const getAuthHeader = () => {
  const token = localStorage.getItem('lostark-api');
  return token ? { Authorization: token } : {};
};

const authRequest = async (method: string, url: string, data?: any) => {
  return axiosPythonInstance({
    method,
    url,
    data,
    headers: getAuthHeader(),
  });
};

export const getPartyScreenInfo = async (image: string) => {
  const { data } = await authRequest('post', API.PARTY.SCREEN, { image });
  return data;
};

export const getMemberInfo = async (nickname: string) => {
  const {data} = await authRequest('get', `${API.PARTY.MEMBER}?nickname=${nickname}`);
  return data;
}
