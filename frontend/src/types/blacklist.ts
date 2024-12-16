export interface BlacklistUser {
  id: number;
  title: string;
  author: string;
  createdAt?: Date;
  likeCount?: number;
  cartQuantity?: number;
}

export type SortType = 'newest' | 'popular';

export interface BlacklistUserDetail {
  nickname: string;
  reason: string;
}

export interface BlacklistDetail {
  message: string;
  post: {
    id: number;
    title: string;
    author: string;
    createdAt?: string;
    likeCount?: number;
    cartQuantity?: number;
  };
  data: BlacklistUserDetail[];
}
