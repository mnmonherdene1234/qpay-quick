export default class QPayPersonMerchant {
  register_number: string = '';
  last_name: string = '';
  first_name: string = '';
  mcc_code: string = '';
  city: string = '';
  district: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';

  constructor({
    register_number = '',
    last_name = '',
    first_name = '',
    mcc_code = '',
    city = '',
    district = '',
    address = '',
    phone = '',
    email = '',
  } = {}) {
    Object.assign(this, {
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
  }
}
