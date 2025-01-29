export const API = {
  AUTH: {
    SIGNUP: '/users/register',
    LOGIN: '/users/login',
  },
  USER: {
    PROFILE: '/users/me',
  },
  PARTY: {
    SCREEN: '/party/screen',
    MEMBER: '/party/member',
  },
} as const;
