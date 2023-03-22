export default class QPayCompanyMerchant {
  owner_register_no = '';
  owner_first_name = '';
  owner_last_name = '';
  location_lat = '';
  location_lng = '';
  register_number = '';
  name = '';
  mcc_code = '';
  city = '';
  district = '';
  address = '';
  phone = '';
  email = '';

  constructor({
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
  } = {}) {
    Object.assign(this, {
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
  }
}
