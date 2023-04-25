export interface OfferSearchRequest {
  id?: number;
  appId?: number;
  merchantId?: number;
  seller?: string;
  vendor?: string;
  productId?: string;
  externalId?: string;
  name?: string;
  publishingStatus?: string;
  subscriptionStatus?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortDirection?: string;
}
