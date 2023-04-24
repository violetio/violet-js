import { OrderSku } from './OrderSku.interface';
import { OrderTax } from './OrderTax.interface';
import { Transaction } from './Transaction.interface';
import { OrderShippingMethod } from './OrderShippingMethod.interface';
import { BagStatus } from '../enums/BagStatus';
import { FinancialStatus } from '../enums/FinancialStatus';
import { FulfillmentStatus } from '../enums/FulfillmentStatus';
import { OrderChannel } from '../enums/OrderChannel';

export interface Bag {
  id: number;
  orderId: number;
  merchantId: number;
  appId: number;
  externalId?: string;
  status: BagStatus;
  fulfillmentStatus: FulfillmentStatus;
  financialStatus: FinancialStatus;
  merchantName?: string;
  skus?: OrderSku[];
  shippingMethod: OrderShippingMethod;
  taxes?: OrderTax[];
  subTotal?: number;
  shippingTotal?: number;
  taxTotal?: number;
  total?: number;
  taxesIncluded?: boolean;
  transactions?: Transaction[];
  externalCheckout?: boolean;
  commissionRate?: number;
  dateCreated?: string;
  dateLastModified?: string;
  remorsePeriodEnds?: string;
  currency?: string;
  externalCurrency?: string;
  currencyExchangeRate?: number;
  channel?: OrderChannel;
}
