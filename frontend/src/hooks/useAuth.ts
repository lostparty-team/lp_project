import { getProfile, logout, postLogin, postSignup } from '@/api/auth';
import { UseMutationCustomOptions } from '@/types/common';
import { removeHeader, setHeader } from '@/utils/header';
import { useMutation, useQuery } from '@tanstack/react-query';

const useRegister = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ access_token }) => {
      setHeader('Authorization', `Bearer ${access_token}`);
    },
    ...mutationOptions,
  });
};

const useMe = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: getProfile,
    onSuccess: ({ id, userId, clientId, apiKey, createdAt, updatedAt, deletedAt }) => {
      console.log(userId);
    },
    ...mutationOptions,
  });
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
    },
  });
};

export { useRegister, useLogin, useMe, useLogout };
