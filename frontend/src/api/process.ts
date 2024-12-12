import { AxiosResponse } from 'axios';
import type { ProcessInfo } from '../types/domain';
import { axiosPythonInstance } from '@/api/axios';
import { API } from '@/constants/route';

const postProcess = async ({ image }: ProcessInfo): Promise<AxiosResponse> => {

  const response = await axiosPythonInstance.post(API.PROCESS, { image }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export { postProcess };
