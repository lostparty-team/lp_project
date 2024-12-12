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
