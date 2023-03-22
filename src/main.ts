import QPayBankAccount from './dto/qpay-bank-account';
import QPayInvoice from './dto/qpay-invoice';
import QPayQuick from './';

async function main() {
  QPayQuick.setup({
    username: 'TEST_VENDOR_MERCHANT',
    password: '123456',
    terminalId: '95000059',
  });

  await createAmountInvoice();
  await getInvoice();
  await checkPayment();
}

main();

async function createAmountInvoice() {
  try {
    const qpayQuick: QPayQuick = await QPayQuick.getInstance();
    const bankAccount: QPayBankAccount = new QPayBankAccount({
      account_name: 'Marlaa Bataa',
      account_number: '490000860',
      account_bank_code: '040000',
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

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function getInvoice() {
  const qpayQuick: QPayQuick = await QPayQuick.getInstance();

  const result = await qpayQuick.getInvoice('f5c84a2a-0197-4275-95b2-c138b901348e');

  console.log(result);
}

async function checkPayment() {
  const qpayQuick: QPayQuick = await QPayQuick.getInstance();

  const result = await qpayQuick.checkPayment('bd1f0349-2134-474b-9349-53536f8d52dc');

  console.log(result);
}
