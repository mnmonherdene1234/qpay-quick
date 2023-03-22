import QPayQuick from '..';
import QPayBankAccount from '../dto/qpay-bank-account';
import { AccountBankCode } from '../dto/qpay-enumerations';
import QPayInvoice from '../dto/qpay-invoice';
import QPayInvoiceResponse from '../dto/qpay-invoice-response';

let invoiceId: string;

test('create invoice', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

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

  expect(result).toBeInstanceOf(QPayInvoiceResponse);

  invoiceId = result.id;
});

test('get invoice', async () => {
  const qpayQuick: QPayQuick = await QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  expect(await qpayQuick.getInvoice(invoiceId)).toBeInstanceOf(QPayInvoiceResponse);
});
