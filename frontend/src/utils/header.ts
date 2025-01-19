import { axiosInstance, axiosPythonInstance } from '@/api/axios';

const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
  axiosPythonInstance.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  if (axiosInstance.defaults.headers.common[key]) {
    delete axiosInstance.defaults.headers.common[key];
  }
  if (axiosPythonInstance.defaults.headers.common[key]) {
    delete axiosPythonInstance.defaults.headers.common[key];
  }
  
};

export { setHeader, removeHeader };
