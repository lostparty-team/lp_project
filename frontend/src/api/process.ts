import { AxiosResponse } from 'axios';
import type { ProcessInfo } from '../types/domain';
import { axiosPythonInstance } from '@/api/axios';
import { API } from '@/constants/route';

const postProcess = async ({ image }: ProcessInfo): Promise<AxiosResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await axiosPythonInstance.post(API.PROCESS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export { postProcess };
