import { AxiosResponse } from 'axios';
import type { RegisterInfo, ResponseToken, UserCredentials } from '../types/domain';
import { axiosAuthInstance, axiosInstance } from '@/api/axios';
import { API } from '@/constants/route';
import { setHeader, removeHeader } from '@/utils/header';
import { AUTH_HEADER } from '@/constants/auth';

const postSignup = async ({ userId, password, api }: RegisterInfo): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post(API.AUTH.SIGNUP, {
    userId,
    password,
    api,
  });
  return data;
};

const postLogin = async ({
  userId,
  password,
}: UserCredentials): Promise<ResponseToken & Pick<AxiosResponse, 'status'>> => {
  const { data, status } = await axiosAuthInstance.post<ResponseToken & Pick<AxiosResponse, 'status'>>(API.AUTH.LOGIN, {
    userId,
    password,
  });
  setHeader(AUTH_HEADER.AUTHORIZATION, `${data.access_token}`);
  return { ...data, status };
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
