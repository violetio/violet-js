import { getConfig } from '../api';
import axios, { AxiosResponse } from 'axios';
import { Merchant } from '../interfaces/Merchant.interface';
import { Page } from '../interfaces/Page.interface';

/**
 * Retrieve a list of all the merchants that your app has access to.
 * @see https://docs.violet.io/view-merchants
 * @param {string} cartId
 */
export const getMerchants = (): Promise<AxiosResponse<Page<Merchant>, any>> => {
  return axios.get<Page<Merchant>>(`${getConfig().apiRootPath}/merchants`);
};
