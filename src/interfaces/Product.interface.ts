import { Category } from './Category.interface';
import { Offer } from './Offer.interface';
import { ProductVariant } from './ProductVariant.interface';
import { Meta } from './Meta.interface';
import { Currency } from '../enums/Currency';
import { ProductRequirement } from '../enums/ProductRequirement';

export interface Product {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  slug: string;
  brand?: string;
  available?: boolean;
  visible?: boolean;
  totalSales?: number;
  type?: 'physical' | 'digital' | 'virtual';
  currency?: Currency;
  minPrice?: number;
  maxPrice?: number;
  variants?: ProductVariant[];
  offers?: Offer[];
  categories?: Set<Category>;
  meta?: Meta[];
  tags?: string[];
  relatedProductIds?: string[];
  crossSaleProductIds?: string[];
  gtins?: string[];
  defaultImageUrl?: string;
  qtyAvailable?: number;
  merchantIds?: number[];
  dateCreated?: string;
  dateLastModified?: string;
  channelReady?: boolean;
  requires?: ProductRequirement[];
  offersAvailable?: number;
}
