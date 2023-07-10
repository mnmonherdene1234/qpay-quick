# QPay Quick

Node.js API integration for the QPay payment system.
QPay Quick API using Axios return Axios response objects. The response objects contain information such as the HTTP status code, response headers, and response data.

## setup

```typescript
const qpayQuick = await QPayQuick.setup({
  username: 'TEST_VENDOR_MERCHANT',
  password: '123456',
  terminalId: '95000059',
  env: QPayEnvironment.Development,
});
```

## getInstance

```typescript
const qpayQuick = await QPayQuick.getInstance();
```

## createInvoice

```typescript
const bankAccount: QPayBankAccount = new QPayBankAccount({
  account_name: 'Marlaa Bataa',
  account_number: '490000860',
  account_bank_code: AccountBankCode.TDB,
  $default: true,
  is_default: true,
});

const invoice: QPayInvoice = new QPayInvoice({
  merchant_id: '97181a8e-b85b-41c0-b745-114ce4459a07',
  amount: 1000,
  currency: 'MNT',
  customer_name: 'TDB',
  customer_logo: '',
  description: 'some description about invoice okay',
  mcc_code: '1234',
  bank_accounts: [bankAccount],
});

const result = await qpayQuick.createInvoice(invoice);
```

## getInvoice

```typescript
const invoice = await qpayQuick.getInvoice('97181a8e-b85b-41c0-b745-114ce4459a07');
```

## createComapanyMerchant

```typescript
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
  address: '101',
  phone: '85368385',
  email: 'mnmonherdene1234@gmail.com',
});
```

## createPersonMerchant

```typescript
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
```

## getMerchantsList

```typescript
const result = await qpayQuick.getMerchantsList({
  offset: {
    page_number: 1,
    page_limit: 1000,
  },
});
```
