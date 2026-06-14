export interface UserApp {
  _id: string;
  displayName: string;
  description: string | null;
  iconUrl: string | null;
  homeUrl: string;
  category: string | null;
  isFavorite: boolean;
}

export interface UserAppsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedUserAppsResponse {
  items: UserApp[];
  meta: UserAppsMeta;
}

export interface UserAppsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

export interface UserCategory {
  _id: string;
  displayName: string;
}

export type FavoritesSortKey = "recent" | "name";

export interface FavoritesQueryParams {
  search?: string;
  categoryId?: string;
  sort?: FavoritesSortKey;
}

export interface FavoritesResponse {
  items: UserApp[];
}
