import { MerchantType } from '../qpay-enumerations';
import QPayCompanyMerchant from './qpay-company-merchant';

export default class QPayCompanyMerchantResponse extends QPayCompanyMerchant {
  id: string = '';
  vendor_id: string = '';
  type: MerchantType = MerchantType.Company;

  constructor({
    id = '',
    vendor_id = '',
    type = MerchantType.Company,
    owner_register_no = '',
    owner_first_name = '',
    owner_last_name = '',
    location_lat = '',
    location_lng = '',
    register_number = '',
    name = '',
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
    owner_register_no?: string;
    owner_first_name?: string;
    owner_last_name?: string;
    location_lat?: string;
    location_lng?: string;
    register_number?: string;
    name?: string;
    mcc_code?: string;
    city?: string;
    district?: string;
    address?: string;
    phone?: string;
    email?: string;
  } = {}) {
    super({
      owner_register_no,
      owner_first_name,
      owner_last_name,
      location_lat,
      location_lng,
      register_number,
      name,
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
