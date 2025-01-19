import { AxiosResponse } from 'axios';
import type { RegisterInfo, ResponseToken, UserCredentials } from '../types/domain';
import { axiosAuthInstance, axiosInstance } from '@/api/axios';
import { API } from '@/constants/route';

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
  const { data, status } = await axiosAuthInstance.post<ResponseToken>(API.AUTH.LOGIN, {
    userId,
    password,
  });
  return { ...data, status };
};

const getProfile = async (): Promise<UserCredentials> => {
  const { data } = await axiosAuthInstance.get(API.USER.PROFILE);
  return data;
};

const logout = async () => {
  await axiosInstance.post('/users/logout');
};

export { postSignup, postLogin, getProfile, logout };
