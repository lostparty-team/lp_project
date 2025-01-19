import { axiosAuthInstance } from '@/api/axios';

const setHeader = (key: string, value: string) => {
  axiosAuthInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  if (!axiosAuthInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosAuthInstance.defaults.headers.common[key];
};

export { setHeader, removeHeader };
