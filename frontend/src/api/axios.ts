import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

const axiosPythonInstance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: false,
});

export { axiosInstance, axiosPythonInstance };
