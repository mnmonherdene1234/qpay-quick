export default class QPayMerchantListRow {
  id: string = '';
  type: string = '';
  register_number: string = '';
  name: string = '';
  first_name: string = '';
  last_name: string = '';
  mcc_code: string = '';
  city: string = '';
  district: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';
  created_date: string = '';

  constructor({
    id = '',
    type = '',
    register_number = '',
    name = '',
    first_name = '',
    last_name = '',
    mcc_code = '',
    city = '',
    district = '',
    address = '',
    phone = '',
    email = '',
    created_date = '',
  } = {}) {
    Object.assign(this, {
      id,
      type,
      register_number,
      name,
      first_name,
      last_name,
      mcc_code,
      city,
      district,
      address,
      phone,
      email,
      created_date,
    });
  }
}
