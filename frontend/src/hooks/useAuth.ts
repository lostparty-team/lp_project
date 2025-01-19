import { getProfile, logout, postLogin, postSignup } from '@/api/auth';
import queryClient from '@/api/queryClient';
import { AUTH_HEADER } from '@/constants/auth';
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
      localStorage.setItem('accessToken', access_token);
      setHeader('Authorization', `Bearer ${access_token}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: ['auth', 'getAccessToken'],
      });
    },
    ...mutationOptions,
  });
};

// const useMe = (mutationOptions?: UseMutationCustomOptions) => {
//   return useMutation({
//     mutationFn: getProfile,
//     onSuccess: ({ id, userId, clientId, apiKey, createdAt, updatedAt, deletedAt }) => {
//       console.log(userId);
//     },
//     ...mutationOptions,
//   });
// };

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader(AUTH_HEADER.AUTHORIZATION);
      localStorage.removeItem('accessToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    ...mutationOptions,
  });
};

function useAuth() {
  const signupMutation = useRegister();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
  };
}

export default useAuth;
