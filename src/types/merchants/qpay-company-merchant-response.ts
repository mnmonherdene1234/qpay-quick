import { MerchantType } from '../qpay-enumerations';
import { QPayCompanyMerchant } from './qpay-company-merchant';

export type QPayCompanyMerchantResponse = {
  id: string;
  vendor_id: string;
  type: MerchantType;
} & QPayCompanyMerchant;
