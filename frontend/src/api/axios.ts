import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MOCK_API,
  withCredentials: true,
});

const axiosAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API,
  withCredentials: false,
});

const axiosPythonInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PYTHON_API,
  withCredentials: false,
});

export { axiosInstance, axiosAuthInstance, axiosPythonInstance };
