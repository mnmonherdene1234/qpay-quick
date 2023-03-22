import QPayBankAccount from "./qpay-quick/qpay-bank-account";
import QPayInvoice from "./qpay-quick/qpay-invoice";
import QPayQuick from "./qpay-quick/qpay-quick";

async function main() {
  QPayQuick.setup({
    username: "TEST_VENDOR_MERCHANT",
    password: "123456",
    terminalId: "95000059",
  });

  // await createAmountInvoice();
  await getInvoice();
}

main();

async function createAmountInvoice() {
  try {
    const qpayQuick: QPayQuick = await QPayQuick.getInstanceAsync();
    const bankAccount: QPayBankAccount = new QPayBankAccount({
      account_name: "Bat Bold",
      account_number: "490000869",
      account_bank_code: "040000",
      $default: true,
      is_default: true,
    });

    const invoice: QPayInvoice = new QPayInvoice({
      merchant_id: "97181a8e-b85b-41c0-b745-114ce4459a07",
      amount: 10,
      currency: "MNT",
      customer_name: "TDB",
      customer_logo: "",
      description: "some description about invoice",
      mcc_code: "5932",
      bank_accounts: [bankAccount],
    });

    const result = await qpayQuick.createInvoice(invoice);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function getInvoice() {
  const qpayQuick: QPayQuick = await QPayQuick.getInstanceAsync();

  const result = await qpayQuick.getInvoice(
    "f5c84a2a-0197-4275-95b2-c138b901348e"
  );

  console.log(result);
}
