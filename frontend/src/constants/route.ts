export const API = {
  AUTH: {
    SIGNUP: '/users/register',
    LOGIN: '/users/login',
  },
  USER: {
    PROFILE: '/users/me',
  },
  PARTY: {
    SCREEN: '/py/party/screen',
    MEMBER: '/py/party/member',
  },
} as const;
