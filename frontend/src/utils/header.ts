import { axiosInstance } from '@/api/axios';

const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};

export { setHeader, removeHeader };
