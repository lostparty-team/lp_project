import { axiosInstance } from './axios';
import { BlacklistUser, SortType } from '@/types/blacklist';

export const blacklistApi = {
  getBlacklist: async (sortType?: SortType) => {
    const { data } = await axiosInstance.get('/api/blacklist', {
      params: sortType ? { sort: sortType } : undefined,
    });
    return data as BlacklistUser[];
  },
};

export const getBlacklistDetail = (id: string) => {
  return axiosInstance.get(`${process.env.NEXT_PUBLIC_TEST_API}/api/blacklist/${id}`);
};
