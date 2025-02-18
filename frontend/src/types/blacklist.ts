export interface BlacklistUser {
  postId: number;
  id: number;
  title: string;
  author: string;
  views: number;
  created_at?: Date;
  cart_count?: number;
  dislikes?: number;
}

export type SortType = 'latest' | 'popular';

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
    created_at?: string;
    dislikes?: number;
    userDisliked?: boolean;
    views?: number;
  };
  data: BlacklistUserDetail[];
}
