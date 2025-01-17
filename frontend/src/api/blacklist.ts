import { axiosInstance } from './axios';
import { BlacklistUser, SortType } from '@/types/blacklist';

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

export const deleteBlacklist = async (id: string) => {
  const { data } = await axiosInstance.delete(`/api/blacklist/${id}`);
  return data;
};

export const getBlacklistDetail = (id: string) => {
  return axiosInstance.get(`/api/blacklist/${id}`);
};

export const postDislike = (id: string) => {
  const getApi = localStorage.getItem('lostark-api');
  return axiosInstance.post(
    `/api/blacklist/dislike/${id}`,
    { id },
    {
      headers: {
        Authorization: getApi,
      },
    },
  );
};
