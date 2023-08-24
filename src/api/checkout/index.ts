import { getConfig } from '../violetjs';
import axios, { AxiosResponse } from 'axios';
import { Order } from '../../interfaces/Order.interface';
import { OrderAddress } from '../../interfaces/OrderAddress.interface';
import { OrderCustomer } from '../../interfaces/OrderCustomer.interface';
import { OrderShippingMethodWrapper } from '../../interfaces/OrderShippingMethodWrapper.interface';
import { OrderSku } from '../../interfaces/OrderSku.interface';

export const cartEndpoint = (cartId: string) =>
  `${getConfig().apiRootPath}/checkout/cart/${cartId}`;

/**
 * Creates a new empty cart.
 * @see https://docs.violet.io/api-reference/order-service/checkout-cart/create-cart
 * @param {string} baseCurrency
 * @param {OrderSku[]} skus Optional array of skus to add to the cart after initialization.
 * @param {boolean} [walletBasedCheckout=true]
 * @param {string} referralId Associate the order with a user or affiliate in your systems.
 * @param {string} appOrderId Associate the newly created cart to an ID in your systems.
 */
export const createCart = (
  baseCurrency: string,
  skus: Partial<OrderSku> &
    Required<Pick<OrderSku, 'skuId' | 'quantity'>>[] = [],
  walletBasedCheckout: boolean = true,
  referralId?: string,
  appOrderId?: string
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(`${getConfig().apiRootPath}/checkout/cart`, {
    baseCurrency,
    skus,
    walletBasedCheckout,
    referralId,
    appOrderId,
  });
};

/**
 * Retrieves a single cart by its ID
 * @see https://docs.violet.io/api-reference/order-service/checkout-cart/get-cart-by-id
 * @param {string} cartId
 */
export const getCart = (cartId: string): Promise<AxiosResponse<Order, any>> => {
  return axios.get<Order>(cartEndpoint(cartId));
};

/**
 * Adds a SKU to the cart by its ID. Quantity will default to 1 if no quantity is passed.
 * Quantities greater than 10 will default to 10.
 * @see https://docs.violet.io/api-reference/order-service/checkout-items/add-sku-to-cart
 * @param {string} cartId
 * @param {OrderSku} orderSku
 * @param {boolean} [price_cart=false]
 */
export const addSkusToCart = (
  cartId: string,
  orderSku: Partial<OrderSku> & Required<Pick<OrderSku, 'skuId' | 'quantity'>>,
  priceCart: boolean = false
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/skus`,
    orderSku,
    {
      params: {
        priceCart,
      },
    }
  );
};

/**
 * Removes a cart SKU by its ID.
 * @see https://docs.violet.io/api-reference/order-service/checkout-items/remove-sku-from-cart
 * @param {string} cartId
 * @param {string} skuId
 */
export const removeSkusFromCart = (
  cartId: string,
  skuId: string
): Promise<AxiosResponse<Order, any>> => {
  return axios.delete<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/skus/${skuId}`
  );
};

/**
 * Updates an order SKU by its ID.
 * @see https://docs.violet.io/api-reference/order-service/checkout-items/update-sku-in-cart
 * @param {string} cartId
 * @param {string} skuId
 * @param {OrderSku} orderSku
 */
export const updateSkuInCart = (
  cartId: string,
  skuId: string,
  orderSku: Partial<OrderSku> & Required<Pick<OrderSku, 'skuId' | 'quantity'>>
): Promise<AxiosResponse<Order, any>> => {
  return axios.put<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/skus/${skuId}`,
    orderSku
  );
};

/**
 * Apply a payment method to the given cartId
 * @see https://docs.violet.io/api-reference/order-service/checkout-payment/apply-payment-method
 * @param {string} cartId
 * Intent Based Capture enables a new payment paradigm that supports 27+ payment methods through Stripe
 * @param {boolean} intentBasedCapture
 */
export const requestIntentBasedCapturePayment = (
  cartId: string,
  intentBasedCapture: boolean
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/payment`,
    {
      intentBasedCapture,
    }
  );
};

/**
 * Applies a shipping method to a bag.
 * Shipping methods available to each bag can be retreived from 'Get Available Shipping Methods' endpoint
 * (https://docs.violet.io/api-reference/order-service/checkout-shipping/get-available-shipping-methods).
 * Each bag requires a shipping method.
 * @see https://docs.violet.io/api-reference/order-service/checkout-shipping/set-shipping-methods
 * @param {string} cartId
 * @param {Array<{ bagId: number; shippingMethodId: string }>} bags
 */
export const applyShippingMethodsToBags = (
  cartId: string,
  bags: Array<{ bagId: number; shippingMethodId: string }>
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/shipping`,
    bags,
    {
      params: {
        priceCart: true,
      },
    }
  );
};

/**
 * Applies a guest customer to the cart.
 * Guest customers consist of a first name, last name, and email address.
 * Guest customers are not persisted within Violet for use on future orders.
 * @see https://docs.violet.io/api-reference/order-service/checkout-customer/apply-guest-customer-to-cart
 * @param {string} cartId
 * @param {OrderCustomer} customer
 */
export const applyCustomerInfoToCart = (
  cartId: string,
  customer: OrderCustomer
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/customer`,
    customer
  );
};

/**
 * Applies the provided billing address to the cart.
 * @see https://docs.violet.io/api-reference/order-service/checkout-customer/set-billing-address
 * @param cartId
 * @param billingAddress
 */
export const applyBillingAddress = (
  cartId: string,
  billingAddress: OrderAddress
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/billing_address`,
    billingAddress
  );
};

/**
 * Returns a list of available shipping methods for each bag.
 * The shipping address and customer must be applied to the cart before requesting shipping methods.
 * @see https://docs.violet.io/api-reference/order-service/checkout-shipping/get-available-shipping-methods
 * @param {string} cartId
 */
export const fetchShippingOptions = (
  cartId: string
): Promise<AxiosResponse<OrderShippingMethodWrapper[], any>> => {
  return axios.get<OrderShippingMethodWrapper[]>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/shipping/available`
  );
};

/**
 * Confirm updated pricing on the order.
 * @see https://docs.violet.io/api-reference/order-service/checkout-payment/update-payment-transaction
 * @param {string} cartId
 */
export const updatePricing = (
  cartId: string
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/payment/update`
  );
};

/**
 * Submits a cart.
 * For each unique bag in your cart an order will be submitted to the source merchant's platform.
 * Depending on the number of bags in your cart this request can take a few moments as each external order is submitted.
 * @see https://docs.violet.io/api-reference/order-service/checkout-completion/submit-cart
 * @param {string} cartId
 */
export const submitPayment = (
  cartId: string
): Promise<AxiosResponse<Order, any>> => {
  return axios.post<Order>(
    `${getConfig().apiRootPath}/checkout/cart/${cartId}/submit`
  );
};
