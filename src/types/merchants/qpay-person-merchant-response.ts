import { MerchantType } from '../qpay-enumerations';
import { QPayPersonMerchant } from './qpay-person-merchant';

export type QPayPersonMerchantResponse = {
  id: string;
  vendor_id: string;
  type: MerchantType;
} & QPayPersonMerchant;
