import QPayQuick, { AccountBankCode, QPayBankAccount, QPayInvoice, QPayInvoiceResponse } from '..';

let invoiceId: string;

test('create invoice', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  const bankAccount: QPayBankAccount = {
    account_name: 'Marlaa Bataa',
    account_number: '490000860',
    account_bank_code: AccountBankCode.TDB,
    is_default: true,
    default: false,
  };

  const invoice: QPayInvoice = {
    merchant_id: '97181a8e-b85b-41c0-b745-114ce4459a07',
    amount: 1000,
    currency: 'MNT',
    customer_name: 'TDB',
    customer_logo: '',
    description: 'some description about invoice okay',
    mcc_code: '1234',
    bank_accounts: [bankAccount],
    callback_url: '',
  };

  const result = await qpayQuick.createInvoice(invoice);

  expect(result.data.amount).toBeDefined();

  invoiceId = result.data.id;
});

test('get invoice', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  const result = await qpayQuick.getInvoice(invoiceId);

  expect(result.data.amount).toBeDefined();
});
