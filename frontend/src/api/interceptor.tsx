'use client';
import { useEffect } from 'react';
import { axiosInstance } from './axios';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

const PROTECTED_PATHS = ['/party-info'];
const PROTECTED_API_PATHS = ['/api/blacklist', '/api/party'];
const TOKEN_KEY = 'accessToken';

interface AxiosInterceptorProps {
  children: React.ReactNode;
}

export const AxiosInterceptor = ({ children }: AxiosInterceptorProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isProtectedRoute = (path: string) => {
    return PROTECTED_PATHS.some((route) => path.startsWith(route));
  };

  const isProtectedApi = (url: string = '') => {
    return PROTECTED_API_PATHS.some((apiPath) => url.includes(apiPath));
  };

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (isProtectedRoute(pathname) || (config.url && isProtectedApi(config.url))) {
          if (!token) {
            toast.error('로그인이 필요합니다.');
            return Promise.reject();
          }
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              localStorage.removeItem(TOKEN_KEY);
              toast.error('로그인이 필요합니다.');
              router.push('/login');
              break;
            case 403:
              router.push('/forbidden');
              break;
          }
        }
        return Promise.reject(error);
      },
    );

    if (isProtectedRoute(pathname)) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        toast.error('로그인이 필요합니다.');
        router.push('/login');
      }
    }

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [router, pathname]);

  return <>{children}</>;
};
