export interface BlacklistUser {
  id: number;
  title: string;
  author?: string;
  createdAt?: string;
  add?: number;
  bad?: number;
}

export type SortType = 'newest' | 'popular';
