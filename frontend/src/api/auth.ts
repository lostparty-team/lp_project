import { AxiosResponse } from 'axios';
import type { RegisterInfo, ResponseToken, UserCredentials } from '../types/domain';
import { axiosInstance } from '@/api/axios';
import { API } from '@/constants/route';
import { setHeader, removeHeader } from '@/utils/header';
import { AUTH_HEADER } from '@/constants/auth';

const postSignup = async ({ id, password, api }: RegisterInfo): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post(API.AUTH.SIGNUP, {
    id,
    password,
    api,
  });
  return data;
};

const postLogin = async ({ id, password }: UserCredentials): Promise<ResponseToken & Pick<AxiosResponse, 'status'>> => {
  const { data, headers } = await axiosInstance.post<ResponseToken & Pick<AxiosResponse, 'status'>>(API.AUTH.LOGIN, {
    id,
    password,
  });
  setHeader(AUTH_HEADER.AUTHORIZATION, `${headers.authorization}`);
  localStorage.setItem('accessToken', headers.authorization);
  return data;
};

const getProfile = async (): Promise<UserCredentials> => {
  const { data } = await axiosInstance.get(API.USER.PROFILE);
  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
  localStorage.removeItem('accessToken');
  removeHeader(AUTH_HEADER.AUTHORIZATION);
};

export { postSignup, postLogin, getProfile, logout };
