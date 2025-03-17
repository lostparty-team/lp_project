import { axiosInstance } from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

interface StatsData {
  블랙리스트등록된유저수: number;
  오늘블랙리스트등록된유저수: number;
  블랙리스트명단작성수: number;
  오늘블랙리스트명단작성수: number;
  방문자수: number;
  오늘방문자수: number;
}

export const useStats = () => {
  return useQuery<StatsData>({
    queryKey: ['userdata'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/userdata');
      return data;
    },
  });
};
