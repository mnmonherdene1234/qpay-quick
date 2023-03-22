import { MerchantType } from '../qpay-enumerations';
import QPayPersonMerchant from './qpay-person-merchant';

export default class QPayPersonMerchantResponse extends QPayPersonMerchant {
  id: string = '';
  vendor_id: string = '';
  type: MerchantType = MerchantType.Company;

  constructor({
    id = '',
    vendor_id = '',
    type = MerchantType.Company,
    register_number = '',
    last_name = '',
    first_name = '',
    mcc_code = '',
    city = '',
    district = '',
    address = '',
    phone = '',
    email = '',
  }: {
    id?: string;
    vendor_id?: string;
    type?: MerchantType;
    register_number?: string;
    last_name?: string;
    first_name?: string;
    mcc_code?: string;
    city?: string;
    district?: string;
    address?: string;
    phone?: string;
    email?: string;
  }) {
    super({
      register_number,
      last_name,
      first_name,
      mcc_code,
      city,
      district,
      address,
      phone,
      email,
    });

    this.id = id;
    this.vendor_id = vendor_id;
    this.type = type;
  }
}
