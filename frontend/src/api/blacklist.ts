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

export const getBlacklist = async (sortType?: SortType) => {
  const {
    data: { data },
  } = await axiosInstance.get('/api/blacklist', {
    params: {
      page: 1,
      sort: sortType,
    },
  });
  return data as BlacklistUser[];
};

export const deleteBlacklist = async (id: number) => {
  const { data } = await authRequest('delete', `/api/blacklist/${id}`, { id });
  return data;
};

export const getBlacklistDetail = (id: string) => {
  return axiosInstance.get(`/api/blacklist/${id}`);
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
