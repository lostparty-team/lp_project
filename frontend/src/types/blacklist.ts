export type SortType = 'newest' | 'latest' | 'cart_count';

export interface BlacklistUser {
  id: number;
  postId?: number;
  title: string;
  author: string;
  views: number;
  created_at: string;
  cart_count: number;
  dislikes: number;
}

export interface BlacklistUserDetail {
  id: number;
  nickname: string;
  reason: string;
}

export interface BlacklistDetailResponse {
  post: {
    id: number;
    title: string;
    author: string;
    views: number;
    created_at: string;
    cart_count: number;
    dislikes: number;
    userDisliked: boolean;
  };
  data: BlacklistUserDetail[];
}
