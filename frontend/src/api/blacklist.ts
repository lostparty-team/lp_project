import { axiosInstance } from './axios';
import { BlacklistUser, SortType } from '@/types/blacklist';

const getAuthHeader = () => {
  const token = localStorage.getItem('lostark-api');
  return token ? { Authorization: token } : {};
};

const authRequest = async (method: string, url: string, data?: any) => {
  return axiosInstance({
    method,
    url,
    data,
    headers: getAuthHeader(),
  });
};

export const getBlacklist = async (sortType?: SortType, page: number = 1, title?: string) => {
  const { data } = await axiosInstance.get('/api/blacklist', {
    params: {
      page,
      sort: sortType,
      title,
    },
  });
  return data;
};

export const deleteBlacklist = async (id: number) => {
  const { data } = await authRequest('delete', `/api/blacklist/${id}`, { id });
  return data;
};

export const getBlacklistDetail = async (id: string) => {
  const { data } = await authRequest('get', `/api/blacklist/${id}`);
  return data;
};

export const postDislike = (id: string) => {
  return authRequest('post', `/api/blacklist/dislike/${id}`, { id });
};

export const getCart = async () => {
  const { data } = await authRequest('get', `/api/blacklist/cart`);
  return data;
};

export const addToCart = async (id: number) => {
  const { data } = await authRequest('post', `/api/blacklist/cart/${id}`, { id });
  return data;
};

export const removeFromCart = async (id: number) => {
  const { data } = await authRequest('delete', `/api/blacklist/cart/${id}`, { id });
  return data;
};
