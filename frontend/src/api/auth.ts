import { AxiosResponse } from 'axios';
import type { RegisterInfo, ResponseToken, UserCredentials } from '../types/domain';
import { axiosInstance } from '@/api/axios';
import { API } from '@/constants/route';

const postSignup = async ({ id, password, api }: RegisterInfo): Promise<AxiosResponse> => {
  const { data } = await axiosInstance.post(API.AUTH.SIGNUP, {
    id,
    password,
    api,
  });
  return data;
};

const postLogin = async ({ id, password }: UserCredentials): Promise<ResponseToken & Pick<AxiosResponse, 'status'>> => {
  const { data } = await axiosInstance.post<ResponseToken & Pick<AxiosResponse, 'status'>>(API.AUTH.LOGIN, {
    id,
    password,
  });
  return data;
};

const getProfile = async (): Promise<UserCredentials> => {
  const { data } = await axiosInstance.get(API.USER.PROFILE);
  return data;
};

const getAccessToken = async (): Promise<ResponseToken> => {
  const accessToken = 'test';
  const { data } = await axiosInstance.get<ResponseToken>('/auth/accessToken', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export { postSignup, postLogin, getProfile, getAccessToken, logout };
