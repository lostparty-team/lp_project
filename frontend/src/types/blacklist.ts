export interface BlacklistUser {
  id: number;
  title: string;
  author: string;
  createdAt?: Date;
  likeCount?: number;
  cartQuantity?: number;
}

export type SortType = 'newest' | 'popular';
