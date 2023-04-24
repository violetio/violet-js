import { getConfig } from '../../api';
import axios, { AxiosResponse } from 'axios';
import { Offer } from '../../interfaces/Offer.interface';
import { Page } from '../../interfaces/Page.interface';
import { Product } from '../../interfaces/Product.interface';

export const getProductsEndpoint = `${
  getConfig().apiRootPath
}/catalog/products`;

/**
 * Retrieves a paginated list of all products in ascending order since date of creation.
 * @see https://docs.violet.io/get-products
 */
export const getProducts = (): Promise<AxiosResponse<Page<Product>, any>> => {
  return axios.get<Page<Product>>(getProductsEndpoint, {
    params: {
      page: 1,
      size: 50,
      excludePublic: true,
    },
  });
};

export const getProductEndpoint = (productId: string) =>
  `${getConfig().apiRootPath}/catalog/products/${productId}`;
/**
 * Retrieves a single product by ID. This request will include all offers of that product.
 * @see https://docs.violet.io/get-product-by-id
 * @param {string} productId
 */
export const getProduct = (
  productId: string
): Promise<AxiosResponse<Product, any>> => {
  return axios.get<Product>(getProductEndpoint(productId));
};

/**
 * Get Offers for a Merchant by Merchant Id
 * @see https://docs.violet.io/interact-with-catalogs#lLsN26wkLmAfdiMbxJjZr
 * @param {string} merchantId
 */
export const getMerchantOffers = (
  merchantId: number
): Promise<AxiosResponse<Page<Offer>, any>> => {
  return axios.get<Page<Offer>>(
    `${getConfig().apiRootPath}/catalog/offers/merchants/${merchantId}`
  );
};
