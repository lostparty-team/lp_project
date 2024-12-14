export interface BlacklistUser {
  id: number;
  title: string;
  author: string;
  createdAt?: Date;
  likeCount?: number;
  cartQuantity?: number;
}

export type SortType = 'newest' | 'popular';

export interface BlacklistDetailType {
  message: string;
  post: {
    id: number;
    title: string;
    author: string;
  };
  data: {
    nickname: string;
    reason: string;
  }[];
}
