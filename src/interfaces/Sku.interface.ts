import { SkuVariantValue } from './SkuVariantValue.interface';
export interface Sku {
  id: number;
  merchantId: number;
  currency: string;
  inStock: boolean;
  offerId: number;
  qtyAvailable: number;
  retailPrice: number;
  salePrice: number;
  status: string;
  quantity: number;
  variantValues: SkuVariantValue[];
  thumbnail: string;
  price?: number;
  name: string;
}
