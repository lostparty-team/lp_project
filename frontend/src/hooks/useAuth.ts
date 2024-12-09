import { logout, postLogin, postSignup } from '@/api/auth';
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
    onSuccess: ({ accessToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      //
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

export { useRegister, useLogin };
