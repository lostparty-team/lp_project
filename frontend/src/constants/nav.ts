export const COMMON_NAV_LINKS = [
  {
    name: '공지사항',
    href: '/notification',
  },
  {
    name: '파티원 정보',
    href: '/party-info',
  },
  {
    name: '블랙리스트',
    href: '/blacklist',
  },
] as const;

export const AUTH_NAV_LINKS = {
  authenticated: {
    name: '로그아웃',
    href: '/logout',
  },
  unauthenticated: {
    name: '로그인',
    href: '/login',
  },
} as const;
