import QPayQuick from '..';
import QPayCompanyMerchantResponse from '../dto/merchants/qpay-company-merchant-response';
import QPayMerchantsList from '../dto/merchants/qpay-merchants-list';
import QPayPersonMerchantResponse from '../dto/merchants/qpay-person-merchant-response';

test('Create Company ', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  const result = await qpayQuick.createComapanyMerchant({
    owner_register_no: 'АО85010102',
    owner_first_name: 'Мөнхнаст',
    owner_last_name: 'Мөнх-Эрдэнэ',
    location_lat: '47.9184676',
    location_lng: '106.9177016',
    register_number: '51201631',
    name: 'MH Karoake',
    mcc_code: '1111',
    city: 'Ulaanbaatar',
    district: 'Baganuur',
    address: 'Хуцаа 101',
    phone: '85368385',
    email: 'mnmonherdene1234@gmail.com',
  });

  expect(result).toBeInstanceOf(QPayCompanyMerchantResponse);
});

test('Create Person', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  const result = await qpayQuick.createPersonMerchant({
    register_number: 'UG04252916',
    last_name: 'Мөнхнаст',
    first_name: 'Мөнх-Эрдэнэ',
    mcc_code: '1111',
    city: 'Ulaanbaatar',
    district: 'Baganuur',
    address: 'Талбай',
    phone: '85368385',
    email: 'mnmonherdene1234@gmail.com',
  });

  expect(result).toBeInstanceOf(QPayPersonMerchantResponse);
});

test('Merchant list', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  const result = await qpayQuick.getMerchantsList({
    offset: {
      page_number: 1,
      page_limit: 1000,
    },
  });

  expect(result).toBeInstanceOf(QPayMerchantsList);
});
