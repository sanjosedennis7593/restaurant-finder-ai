export interface RestaurantPayload {
  query: string;
  near?: string;
  price?: number;
  categories?: string;
  limit?: number;
  open_now?: boolean
  min_price?: number
  max_price?: number
  radius?: number
  sort?: string
}

export interface RequestQuery {
  message?: string;
  code?: string;
}

export interface SearchRestaurantParams {
  query: string;
  near?: string;
  price?: number[];
  categories?: string[];
}
